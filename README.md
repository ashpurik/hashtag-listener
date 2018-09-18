# Hashtag Listener

The hashtag listener is a Force.com App that watches and reports on hashtags through different channels using Platform Events.

## Dev, Build and Test


## Resources

https://trailhead.salesforce.com/projects/workshop-platform-events

## Description of Files and Directories


## Issues

# twitter-listener-sfdx-core
Stream tweets into Salesforce via Platform Events

This is an edited version of this project: https://github.com/Amorelandra/twitter-salesforce-stream by Emily Rose

NOTE: This project requires a [Twitter app](https://apps.twitter.com/).

## Install
1. Type `git clone git@github.com:ashpurik/twitter-listener-sfdx-core.git`
1. Type `cd twitter-listener-sfdx-core`
1. Type `npm install`

## Configure

You will need the following environment variables:

### Twitter
1. __TWITTER_CONSUMER_KEY__ -- Twitter app key
1. __TWITTER_CONSUMER_SECRET__ -- Twitter app secret
1. __TWITTER_ACCESS_TOKEN__ -- Twitter client token
1. __TWITTER_ACCESS_TOKEN_SECRET__ -- Twitter client secret
1. __TWITTER_SEARCH_STRING__ -- Search keywords, comma separated

### Salesforce

This app requires an authenticated org

1. ```sfdx force:auth:web:login```

2. ```sfdx force:config:set defaultusername=<your username> --global```

### Node.js
1. __NODE_ENV__ -- Use `production` for production, or `sandbox` for scratch orgs

If you're deploying with Heroku, just throw these variables into an .env file in the project base directory and use `heroku local` to launch the app.

Here's a template to copy/paste:
```code
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=
TWITTER_SEARCH_STRING=
NODE_ENV=
```

## Run
1. Type `npm start`
