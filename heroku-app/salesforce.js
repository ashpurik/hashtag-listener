const { AuthInfo, Connection, Org } = require('@salesforce/core');
const jsforce = require('jsforce');

module.exports = class Salesforce extends Org {
    static async retrieveConnection() {
        if (!Salesforce.org) {
            // Should be updated to use username and password
            const username = process.env.SALESFORCE_USERNAME;
            const passcode = `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_SECURITY_TOKEN}`;
            const conn = new jsforce.Connection({});
            const userInfo = await conn.login(username, passcode);
            const authInfo = await AuthInfo.create(username, {
                accessToken: conn.accessToken,
                instanceUrl: conn.instanceUrl
            });
            Salesforce.org = await Org.create(await Connection.create(authInfo));
        }
        return Salesforce.org.getConnection();
    }

    static async sendHashtagEvent(tweet) {
        try {
            const conn = await Salesforce.retrieveConnection();
            const event = conn.sobject('Hashtag__e');
            event.create({'Message__c': tweet.text, 'Author__c': tweet.user.screen_name});
            console.log('Tweet published from', tweet.user.screen_name);
            return 'posted';
        } catch(e) {
            console.error(e);
            return e.message;
        }
    }
};