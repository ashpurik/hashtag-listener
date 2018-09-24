let Twitter = require('twit');

function requireEnvVar(envVarName) {
    const value = process.env[envVarName];

    if (!value) {
        throw new Error(`${envVarName} environment variable required.`)
    }
    return value;
}

const consumer_key = requireEnvVar('TWITTER_CONSUMER_KEY');
const consumer_secret = requireEnvVar('TWITTER_CONSUMER_SECRET');
const access_token = requireEnvVar('TWITTER_ACCESS_TOKEN');
const access_token_secret = requireEnvVar('TWITTER_ACCESS_TOKEN_SECRET');

let twitter = new Twitter({
    consumer_key,
    consumer_secret,
    access_token,
    access_token_secret
});

module.exports = { twitter };
