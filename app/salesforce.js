let { Org } = require('@salesforce/core');

module.exports = class Salesforce extends Org {
    static org;

    static async retrieveConnection() {
        if (!org) {
            Salesforce.org = await Org.create();
        }
        return Salesforce.org.getConnection();
    }

    static async sendHashtagEvent(tweet) {
        try {
            const event = await Salesforce.retrieveConnection().sobject('Hashtag__e');
            event.create({'Message__c': tweet.text, 'Author__c': tweet.user.screen_name});
            console.log('Tweet published from', tweet.user.screen_name);
        } catch(e) {
            console.error(e);
        }
    }
};