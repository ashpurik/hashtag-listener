global.exit = function exit(code, msg) { console.log(`ERROR: ${msg}`); process.exit(code || 1); }
global.missing = function missing(variable) { exit(1, `${variable} environment variable required.`); }

let { twitter, track } = require('./app/twitter');
let { retrieveOrg } = require('./app/salesforce');

let tweetStream = twitter.stream('statuses/filter', { track });

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const sendPlatformEvent = async (tweet) => {
    const org = await retrieveOrg();
    
    try {
        let event = await org.getConnection().sobject('Hashtag__e').create({'Message__c': tweet.text});
        console.log('Tweet published from', tweet.user.screen_name);
    } catch(e) {
        console.error(e);
    }
}

app.get('/', (req, res) => {
//     sendPlatformEvent({
//         text: "Hello!",
//         user: {
//             screen_name: 'anastasia_dev'
//         }
//     })
     res.send('Web disabled');
})

app.listen(port, () => console.log(`Hashtag listener app listening on port ${port}!`))

tweetStream.on('tweet', async (tweet) => {
    sendPlatformEvent(tweet);
});
