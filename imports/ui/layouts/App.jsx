import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Lists } from '../../api/lists/lists.js';
import { User } from '../../api/users/users.js';
import { ResolutionLog } from '../../api/resolution_logs/resolution-logs.js';
import { ResolutionLogsHelpers } from '../../api/resolution_logs/resolution-logs.js';
import UserMenu from '../components/UserMenu.jsx';
import MainMenu from '../components/MainMenu.jsx';
import ListList from '../components/ListList.jsx';
import LanguageToggle from '../components/LanguageToggle.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showConnectionIssue: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({ loading, children }) {
	// redirect somewhere once data is ready
    if (!loading && !children) {
		let user = Meteor.user();
		if (user) {
			user = User.findOne(user._id)
		}

		// Not logged in, point to join page
		let redirectTo = '/join'
		if (user) {
			if (user.hasStripeSubscription()) {
				// All done with subscription steps, redirect to their dashboard
				redirectTo = '/dashboard';
			} else if (ResolutionLogsHelpers.userHas(user._id)) {
				// Has done step 2 of picking resolutions plans, do step 3 of credit card
				redirectTo = '/subscribe-join'
			} else if (user.basicsFull()) {
				// Has done step 1 of basics input, do step 2 of planning
				redirectTo = '/subscribe-plans'
			} else {
				// Just started registration get basics
				redirectTo = '/subscribe-basics'
			}
		}
		this.context.router.replace(redirectTo)
    }
  }

  toggleMenu(menuOpen = !Session.get('menuOpen')) {
    Session.set({ menuOpen });
  }

  logout() {
    Meteor.logout(() => {
      this.context.router.replace('/signin')
    });
  }

  render() {
    const { showConnectionIssue } = this.state;
    const {
      user,
      connected,
      loading,
      lists,
      menuOpen,
      children,
      location,
    } = this.props;

    // eslint-disable-next-line react/jsx-no-bind
    const closeMenu = this.toggleMenu.bind(this, false);

    // clone route components with keys so that they can
    // have transitions
    const clonedChildren = children && React.cloneElement(children, {
      key: location.pathname,
    });

    return (
      <div id="container" className={menuOpen ? 'menu-open' : ''}>
        <section id="menu">
          <UserMenu user={user} logout={this.logout} />
		  <MainMenu user={user} />
        </section>
        {showConnectionIssue && !connected
          ? <ConnectionNotification />
          : null}
        <div className="content-overlay" onClick={closeMenu} />
        <div id="content-container">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {loading
              ? <Loading key="loading" />
              : clonedChildren}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,      // current meteor user
  connected: React.PropTypes.bool,   // server connection status
  loading: React.PropTypes.bool,     // subscription status
  menuOpen: React.PropTypes.bool,    // is side menu open?
  lists: React.PropTypes.array,      // all lists visible to the current user
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
  params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
  router: React.PropTypes.object,
};
