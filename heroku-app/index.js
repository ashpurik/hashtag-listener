// Gracefully close on thrown error
process.on('uncaughtException', error => {
    console.log(error.message);
    process.exit(1);
});

const fs = require('fs');

const Salesforce = require('./salesforce');
const twitter = require('./twitter')();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let track;

try {
    // Pull the hashtag from apex
    const hashtagController = fs.readFileSync(`${__dirname}/../force-app/main/default/classes/HashtagController.cls`).toString();
    track = hashtagController.match(/public static string hashtag = '(\w+)';/)[1].split(',');
    console.log(`Using hashtag #${track}!`)
} catch (e) {
    throw new Error(`There was a problem reading the hashtag from the apex class! ${e.message}`);
}

const tweetStream = twitter.stream('statuses/filter', { track });

app.get('/', (req, res) => {
     res.send('Web disabled');
});

if (process.env.NODE_ENV !== 'production') {
    app.get('/testtweet', async (req, res) => {
        const msg = await Salesforce.sendHashtagEvent({
            text: 'test message',
            user: { screen_name: 'test user' }
        });
        res.send(msg);
    });
}

app.listen(port, () => {
    console.log(`Hashtag listener app listening on port ${port}!`);
});

tweetStream.on('tweet', async (tweet) => {
    Salesforce.sendHashtagEvent(tweet);
});
