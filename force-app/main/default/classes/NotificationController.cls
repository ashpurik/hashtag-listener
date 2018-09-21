public class NotificationController {

    @AuraEnabled
    public static String getSessionId() {
        return UserInfo.getSessionId();
    }
    
    public static void publishNotifications(List<String> messages) {
        List<Hashtag__e> notifications = new List<Hashtag__e>();
        for (String message: messages) {
            notifications.add(new Hashtag__e(Message__c = message));
        }
        
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