trigger SalesforceDXTopicAssignmentTrigger on TopicAssignment (after insert) {
    // Get FeedItem posts only
    Set<Id> feedIds = new Set<Id>();
    for (TopicAssignment ta : Trigger.new){
        if (ta.EntityId.getSObjectType().getDescribe().getName().equals('FeedItem')) {
            feedIds.add(ta.EntityId);
        }
    }
        
    // Load FeedItem bodies
    Map<Id,FeedItem> feedItems = new Map<Id,FeedItem>([SELECT Body, Author FROM FeedItem WHERE Id IN :feedIds]);
        
    // Create messages for each FeedItem that contains the SalesforceDX topic
    List<Hashtag__e> messages = new List<Hashtag__e>();
    for (TopicAssignment ta : [SELECT Id, EntityId, Topic.Name FROM TopicAssignment
        WHERE Id IN :Trigger.new AND Topic.Name = HashtagController.hashtag]) {
            FeedItem feedItem = feedItems.get(ta.EntityId);
            String message = feedItem.body.stripHtmlTags().abbreviate(255);
            String author = feedItem.author;
            messages.add(new Hashtag__e(Message__c = message, Author__c = author));
    }
    
    System.debug(messages);
    
    // Publish messages as notifications
    HashtagController.publishHashtagEvents(messages);

}