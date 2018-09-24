# Hashtag Listener

The hashtag listener streams messages into Salesforce via Platform Events whenever the hashtag 'SalesforceCLI' is detected, whether on Twitter or Chatter Posts.

This repo consists of a Force.com app that performs the Chatter reporting of the hashtag, or Topic,
and a heroku app that streams tweets with the hashtag.

NOTE: This project requires a [Twitter app](https://apps.twitter.com/).

## Configure

You will need the following environment variables:

### Twitter
1. __TWITTER_CONSUMER_KEY__ -- Twitter app key
1. __TWITTER_CONSUMER_SECRET__ -- Twitter app secret
1. __TWITTER_ACCESS_TOKEN__ -- Twitter client token
1. __TWITTER_ACCESS_TOKEN_SECRET__ -- Twitter client secret

### Node.js
1. __NODE_ENV__ -- Use `production` for production, or `sandbox` for scratch orgs

If you're deploying with Heroku, just throw these variables into an .env file in the project base directory and use `heroku local` to launch the app.

Here's a template to copy/paste:
```code
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=
NODE_ENV=
```

## Dev, Build and Test

1. Type `git clone git@github.com:ashpurik/hashtag-listener.git`
1. Type `cd hashtag-listener`
1. Type `npm install`
1. Authenticate to a Salesforce org: `sfdx force:auth:web:login`
1. [Optional] Set this org as the default: `sfdx force:config:set defaultusername=<your username> --global`
1. Deploy the app into the org: `sfdx force:source:deploy -p force-app`

## Resources

https://trailhead.salesforce.com/projects/workshop-platform-events
This is an edited version of this project: https://github.com/Amorelandra/twitter-salesforce-stream by Emily Rose

## Run
1. Type `npm start`
