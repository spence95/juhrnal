/*
Database entry table has the following fields
 - entryDate (date)
 - text (text)
 - title
 - picture
 - audio
 - username
*/
var Datastore = require('nedb')
 , db = new Datastore({ filename: 'C:/Shadowmere/learning/journalingapp/main.db'});


//get all documents
db.loadDatabase(function(err){
  console.log(err);
  db.find({username: 'spencer'}, function(err, entries){
      console.log(docs);
  });
});



document.getElementById("submitEntry").addEventListener("click", function (e) {
  var entry = {
    entryDate: new Date(),
    text: document.getElementById("journalEntry").value,
    title: "No title field yet",
    picture: "not implemented",
    audio: "not implemented",
    username: "spencer"
  };
  db.loadDatabase(function (err) {
    if(!err){
      db.insert(entry, function(err, result){
        if(!err){
          console.log(result);
          //TODO: email entry to user's email here
        } else {
        alert("Database insertion error: " + err);
        }
      });
    } else {
      alert("Database error: " + err);
    }
  });
});