# New Years Resolutions

Documentation here a Work In Progress

## DB Schema


### High level

```
                   Teams (Many users)
                     ||
                     ||
                    \  /
                   Users (With indirect links can have many teams and many ResolutionLogs')
                    / \
                     |
                     |
            ResolutionLogs (Per Entry: One User, One ResolutionPlan)
                     |
                     |
                    \ /
             ResolutionPlans (With link can have many ResolutionLogs')
```

**High level scaling thoughts**

* Quick for individual users
* May slow down team queries
    * Particularly if we want to have a team view that wants to dig into detauls ResolutionPlans for it
* May need to later map teams to Resolution Plans, right now only Users have ResolutionPlans.
    * Perhaps if Users in a Team following same ResolutionPlan, then they can see each others?
        * Private concerns to figure out later?
* Slowish to find a list of teams a user belongs to, but fast to find a list of users in a team
* Can always do caching when we need to improve performance, but trying to optomize for likely queries as much as we can now
* Resolutions are meant to be a single course and not ongoing. There will be a lot of data in those objects, and won't be easy to query across multiple.
    * If the core concept is viewing a single Resolution at a time we're fine
    * This structure leaves room for multiple runs of single ResolutionLogs

## Deployment

1. Do something like `ln -s /home/<user>/NewYearsResolutionsSecrets secrets` where a clone of [NewYearsResolutionsSecrets](https://github.com/KevinJain/NewYearsResolutionsSecrets)
1. Use `resources/bin/*` to deploy to stage / production
1. Think about DB migrations as needed
    1. TODO later: Automate this

# Original Description

[![Circle CI](https://circleci.com/gh/meteor/todos/tree/react.svg?style=svg)](https://circleci.com/gh/meteor/todos/tree/react)

This is a Todos example app built on the principles described in the [Meteor Guide](http://guide.meteor.com/structure.html). This app uses the module functionality introduced in Meteor 1.3.

This branch (`react`) implements the UI in [React](https://facebook.github.io/react/index.html). You can read more about using React in Meteor in the [Meteor guide article on the subject](http://guide.meteor.com/v1.3/react.html).

### Running the app

```bash
meteor npm install
meteor
```

### Scripts

To lint:

```bash
meteor npm run lint
```
