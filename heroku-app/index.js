const { Salesforce } = require('./salesforce');
const { twitter } = require('./twitter');
const fs = require('fs');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let hashtag;

try {
    // Pull the hashtag from apex
    hashtag = fs.readFileSync('../force-app/main/default/classes/HashTagController.cls').match(/public static string hashtag = '(\w+)';/)[1];
    console.log(`Using hashtag #${hashtag}!`)
} catch (e) {
    throw new Error(`There was a problem reading the hashtag from the apex class! ${e.message}`);
}

const tweetStream = twitter.stream('statuses/filter', { hashtag });

app.get('/', (req, res) => {
     res.send('Web disabled');
});

app.listen(port, () => {
    console.log(`Hashtag listener app listening on port ${port}!`);
});

tweetStream.on('tweet', async (tweet) => {
    Salesforce.sendHashtagEvent(tweet);
});
