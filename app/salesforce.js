let { Org } = require('@salesforce/core');

module.exports = {
    retrieveOrg: async () => { 
        return await Org.create();
    }
};