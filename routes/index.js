var express     = require('express');
var router      = express.Router();
var mongodb     = require('mongodb');
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

var url = "mongodb://localhost:27017/";



router.get('/', (req, res, next) => {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log("We are connected");
        }
        var dbo = db.db("algolia_api");
        var collection =  dbo.collection('node_articles');
        data = '';

        var sort = { created_at: -1 };
        collection.find().sort(sort).toArray(function(err, docs){
            if(err) throw err;
           
            res.render('index', {data: docs});
            db.close();
          });
      });
  });

  router.get('/delete', (req, res, next) => {
    var id = req.query.id;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log("We are connected");
        }
        var dbo = db.db("algolia_api");
    
  
        dbo.collection('node_articles', function(err, products) {
            products.deleteOne({_id: new mongodb.ObjectID(id)});
            if (err){
               throw err;
             }else{
                db.close();
                res.redirect('/');
             }
          });
        
     
    });
  });

module.exports = router;