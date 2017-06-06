/* globals Meteor */
/* eslint-disable lodash/import-scope */
/* eslint-disable max-len */
import BaseComponent from '../components/BaseComponent.jsx'
import MobileMenu from '../components/MobileMenu.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import React from 'react'
import UploadImage from '../components/UploadImage.jsx'
import _ from 'lodash'

export default class TeamPage extends BaseComponent {
	constructor(props, context) {
		super(props)
		this.state = {
			extrainfo: ''
		}

		this.submitExtraInfo = this.submitExtraInfo.bind(this)
		this.changeExtraInfo = this.changeExtraInfo.bind(this)
		this.teamImageUploaded = this.teamImageUploaded.bind(this)
	}
	teamImageUploaded(result) {
		Meteor.call('teams.add.image', this.props.team._id, result.public_id, (err, res) => {
			if (err) {
				console.log(err)
				alert('Error uploading team image')
				return
			}
		})
	}

	submitExtraInfo(ev) {
		ev.preventDefault()
		Meteor.call(
			'teams.set.extrainfo',
			this.props.team._id,
			this.state.extrainfo,
			(err, newTeam) => {
				if (err) {
					console.log(err)
					alert('Error adding extra info to team')
					return
				}
				alert('Saved')
			}
		)
	}
	changeExtraInfo(ev) {
		this.setState({ extrainfo: ev.target.value })
	}

	render() {
		// TODO: Get rid of this hack, shouldn't be calling setState() render in
		// TODO: * Had to do because teams isn't loaded always when render is called
		// TODO: ** Can probably work around this in the container
		if (!this.state.extrainfo && this.props.team && this.props.team.extrainfo) {
			this.setState({ extrainfo: this.props.team.extrainfo })
		}
		let imageEls = ''
		if (this.props.team && this.props.team.images) {
			imageEls = _.map(this.props.team.images, img => {
				const cloudinaryPrefix = 'https://res.cloudinary.com/'
				const cloudName = Meteor.settings.public.cloudinary.name
				const lTrans = 'w_600,c_fill'
				const url = `${cloudinaryPrefix}${cloudName}/image/upload/${lTrans}/${img}.jpg`
				return (
					<div key={img}>
						<img src={url} />
					</div>
				)
			})
		}

		if (this.props.loading) {
			return <NotFoundPage />
		}
		const memberEls = _.map(this.props.members, member =>
			<div className="member" key={member._id}>
				<h4>{member.firstName} {member.lastName}</h4>
				<p>Phone: {member.phone}</p>
			</div>
		)

		return (
			<div className="page team">
				<nav>
					<MobileMenu />
				</nav>
				<div className="content-scrollable">
					<div>
						<h2>Team: {this.props.team.title}</h2>

						<h3>Team Members</h3>
						<div className="members">
							{memberEls}
						</div>
					</div>
					<div className="clear">
						<form onSubmit={this.submitExtraInfo}>
							<h3>Extra information</h3>
							<p>
								Stuff like: Ideas, venues, events, times, taks, speakers, images,
								arts, concepts, donations / funding needs, locations, etc.
							</p>
							<textarea value={this.state.extrainfo} onChange={this.changeExtraInfo} />
							<input type="submit" value="submit" />
						</form>

					</div>
					<div className="clear">
						{imageEls}
						<div className="clear">
							<h2>Upload team image</h2>
							<UploadImage success={this.teamImageUploaded} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

TeamPage.propType = {
	team: React.PropTypes.object,
	members: React.PropTypes.array,
	loading: React.PropTypes.bool
}

TeamPage.contextTypes = {
	router: React.PropTypes.object
}
