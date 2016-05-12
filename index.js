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

//new entry tab listener
document.getElementsByClassName("sideButton")[0].addEventListener("click", function(e){
  document.getElementById("newEntry").style.display = 'block';
  document.getElementById("history").style.display = "none";
  toggleSideButtons(0);
});

//history tab listener
document.getElementsByClassName("sideButton")[1].addEventListener("click", function(e){
  toggleSideButtons(1);

  document.getElementById("newEntry").style.display = 'none';
  loadHistory();
});

//settings tab listener
document.getElementsByClassName("sideButton")[2].addEventListener("click", function(e){
  toggleSideButtons(2);
  document.getElementById("history").style.display = "none";
  document.getElementById("newEntry").style.display = 'none';
});

function toggleSideButtons(activeIndex){
  var i = 0;
  var els = document.getElementsByClassName("sideButton");

  Array.prototype.forEach.call(els, function(el) {
      if(i == activeIndex){
        el.className += " activeSB";
      } else {
        el.className = "sideButton";
      }
      i++;
  });


}


function loadHistory(){
  document.getElementById("history").style.display = 'block';

  var entriesShownLimit = 10;

  //get all documents
  db.loadDatabase(function(err){
    if(!err){
      db.find({username: 'spencer'}).sort({ entryDate: -1 })
      .limit(entriesShownLimit).exec(function (err, entries) {
        //populate entries
        document.getElementById('history').innerHTML = "";
        entries.forEach(function(entry){
          document.getElementById('history').innerHTML += "<div class='entry'> \
            <div class='entryDate'>" + entry.entryDate + "</div> \
            <div class='entryText'>" + entry.text + "</div> \
          </div>";
        });
      });
    } else {
      alert("Database retrieval error: " + err);
    }
  });
}
