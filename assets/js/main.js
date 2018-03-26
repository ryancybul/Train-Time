$(document).ready(function() {

//Variables
var name = '';
var destination = '';
var time = '00:00 AM';
var minutes = 0;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDjkxMgwztrm3XKcGl56AE2gb3otFoYgjY",
    authDomain: "train-time-67246.firebaseapp.com",
    databaseURL: "https://train-time-67246.firebaseio.com",
    projectId: "train-time-67246",
    storageBucket: "train-time-67246.appspot.com",
    messagingSenderId: "326239524493"
};

firebase.initializeApp(config);
var database = firebase.database();

//Functions
//Pull data down from Firebase and display it. 
    function init() {
        $('.js-table-body').val('');
        //Listens for new data added to spreadsheet then prints it to DOM
        database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
            let s = snapshot.val();

            //Targets the table body element
            $('.js-table-body').append('<tr><td>' + s.name + '</td><td>' + s.destination +'</td><td>' + s.frequency + '</td><td>' + s.arrival + '</td><td>' + s.minutes + '</td></tr>');
        });
    }

//Submit new data to database
    function submit() {
        name = $('#js-trainName').val().trim();
        destination = $('#js-destination').val().trim();
        time = $('#js-firstTrain').val().trim();
        minutes = $('#js-minutes').val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            frequency: time,
            arrival: 'arrival',
            minutes: 'minutes',
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    clearText();
    init ();
    }

    function clearText() {
        $('#js-trainName').val('');
        $('#js-destination').val('');
        $('#js-firstTrain').val('');
        $('#js-minutes').val('');
    }

//Events
init();

//Submit button
    $('.js-form').on('click', '.btn', function(event) {
        //Prevents button from trying to refresh the page
        event.preventDefault();
        submit();
    })

});