let request = require('request');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient, format = require('util').format;;
var url = "mongodb://localhost:27017/";

let api_url = `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`

function insertStories(storyTitle, storyURL, storyAuthor, storyCreatedAt) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log("We are connected");
        }
        var dbo = db.db("algolia_api");
        var collection =  dbo.collection('node_articles');
        var story = {
            "story_title": storyTitle,
            "story_url": storyURL,
            "author": storyAuthor,
            "created_at": storyCreatedAt
        };
        var upsert = {
            "upsert": true
        };
        collection.update(story, story, upsert, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
        db.close();
    });
}


request(api_url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    var data = JSON.parse(body);

    for (var i = 0, len = data.hits.length; i < len; i++) {

        story_title = data.hits[i].story_title;
        story_url = data.hits[i].story_url;
        created_at = data.hits[i].created_at;
        author = data.hits[i].author;

        if (story_title == null) {
           story_title = data.hits[i].title;
       }
       if (story_url == null) {
           story_url = data.hits[i].url;
       }

    insertStories(story_title, story_url, author, created_at);
    }
   
     
  }
});


