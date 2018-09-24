public class HashtagController {
    // This line must be in this exact format for the heroku app to pick it up.
    public static string hashtag = 'SalesforceCLI';

    public static void publishHashtagEvents(List<Hashtag__e> notifications) {
        List<Database.SaveResult> results = EventBus.publish(notifications);
        
        // Inspect publishing results
        for (Database.SaveResult result : results) {
            if (!result.isSuccess()) {
                for (Database.Error error : result.getErrors()) {
                    System.debug('Error returned: ' +
                    error.getStatusCode() +' - '+
                    error.getMessage());
                }
            }
        }
    }

}