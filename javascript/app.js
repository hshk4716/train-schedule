

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPCg3vMYd98nvZjVBmw6iURatTCWmEA0c",
    authDomain: "train-times-ca6a5.firebaseapp.com",
    databaseURL: "https://train-times-ca6a5.firebaseio.com",
    projectId: "train-times-ca6a5",
    storageBucket: "train-times-ca6a5.appspot.com",
    messagingSenderId: "799061813011"
  };
  firebase.initializeApp(config);

var scheduleData = new Firebase("https://train-times-ca6a5.firebaseio.com/");

$(document).ready(function(){

    $("#submit").on("click", function(){

        // Set form values to variables
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequencyInput").val().trim();

        // Set form variable to trainInfo in order to push to Firebase
        var trainInfo = {
            name:  trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        // pushing trainInfo to Firebase
        scheduleData.push(trainInfo);

        console.log(trainInfo.name);
        console.log(trainInfo.destination); 
        console.log(firstTrain);
        console.log(trainInfo.frequency)

       
        // clear text-boxes
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

        // stop refresh

        return false;
    });

//google helped a lot for this. i hate moment really hope this is the last of moment
    
    scheduleData.on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());

        // assign firebase variables to snapshots.
        var fireName = childSnapshot.val().name;
        var fireDestination = childSnapshot.val().destination;
        var fireFrequency = childSnapshot.val().frequency;
        var fireFirstTrain = childSnapshot.val().firstTrain;

        
        var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
        var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
        var minutes = fireFrequency - remainder;

        var arrival = moment().add(minutes, "m").format("hh:mm A"); 
        console.log(minutes);
        console.log(arrival);

        console.log(moment().format("hh:mm A"));
        console.log(arrival);
        console.log(moment().format("X"));

        // train schedule applied to table
        $("#trainSchedule > tbody").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

    });
});
