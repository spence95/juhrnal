/*
Database entry table has the following fields
 - entryDate (date)
 - text (text)
 - title
 - picture
 - audio
 - username
*/

var emailer = require('./journal-emailer');
var Datastore = require('nedb')
 , db = new Datastore({ filename: 'C:/Shadowmere/learning/journalingapp/main.db'});

angular.module('juhrnal', [])
  .controller('newEntry', function($scope) {
    console.log("ar");
    $scope.submitEntry = function(){
      console.log("clicked");
    }

    document.getElementById("submitEntry").addEventListener("click", function (e) {
      console.log(document.getElementById("journalEntry").value);
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
              //email entry to user's email here
              emailer("sutton1190@gmail.com", "sutton1190@gmail.com", "greeneggsandham400", result.entryDate, result.text)
            } else {
            alert("Database insertion error: " + err);
            }
          });

        } else {
          alert("Database error: " + err);
        }
      });
      document.getElementById("journalEntry").value = "<img src='C:/Users/spence95/Pictures/Mae/mae'/ style='width:200px;'>";
    });

    document.getElementById("insertPic").addEventListener("click", function(e){
      var elem = document.getElementById("attachedFile");
      var evt = document.createEvent("MouseEvents");
      var evt = new Event("look", {"bubbles":true, "cancelable":false});
      document.dispatchEvent(evt);
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);

      //get all pics
      var files = document.getElementById("attachedFile").files;
      console.log(elem.files);
      for (var i = 0; i < files.length; i++){
        console.log(files[i]);
      }
    })

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
            document.getElementById('mainbox').innerHTML = "";
            entries.forEach(function(entry){
              var dd = entry.entryDate.getDate();
              var mm = entry.entryDate.getMonth()+1; //January is 0!
              var yyyy = entry.entryDate.getFullYear();

              var realDate = mm + "/" + dd + "/" + yyyy;

              document.getElementById('mainbox').innerHTML += "<div class='entry'> \
                <div class='entryDate'>" + realDate + "</div> \
                <div class='entryText'><p>" + entry.text.replace(/\n/g, "</br>") + "</p></div> \
              </div>";
            });
          });
        } else {
          alert("Database retrieval error: " + err);
        }
      });
    }

  });
