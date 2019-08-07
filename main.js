function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: 40.8054491, lng: -73.9654415},
      zoom: 10,
      scrollwheel: false
  	});
    var marker = new google.maps.Marker({
      position: {lat: 40.8054491, lng: -73.9654415},
      map: map,
      title: 'Monks Cafe'
    });
};

  // Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBI5D7gUJQDiyqwmVOTlWNs919rNrTY27g",
    authDomain: "reservation-site-35bee.firebaseapp.com",
    databaseURL: "https://reservation-site-35bee.firebaseio.com",
    projectId: "reservation-site-35bee",
    storageBucket: "",
    messagingSenderId: "636473277246",
    appId: "1:636473277246:web:f99da87be5d30845"
  };

  var app = firebase.initializeApp(firebaseConfig);
  var database = firebase.database(app);

  var reservationData = {};

// Create a reservation
$('#res-form').on('submit', function(e){

  e.preventDefault();

  var nameInput = $('#res-name').val();
  var dayInput = $('#res-day').val();

  // form validation
  if (nameInput.length < 1) {
      $('#res-name').after('<span class="error">This field is required</span>');
   } else {
   	  reservationData.name = nameInput;
   	    $('#res-name').val('');
   }
    if (dayInput.length < 1) {
      $('#res-day').after('<span class="error">This field is required</span><br>');
   }  else {
      reservationData.day = dayInput;
        $('#res-day').val('');
   }

  // create a section for res data in your db
  var reservationDataRef = database.ref('reservations');

  // use the set method to save data to the res
  reservationDataRef.push(reservationData);

});

// Delete a reservation
$('.all-reservations').on('click', '#res-delete', function (e) {
  // Get the ID for the res we want to update
  var id = $(e.target).parent().parent().data('id')

  // find res whose objectId is equal to the id we're searching with
  var resReference = database.ref('reservations/' + id)

  // Use remove method to remove the res from the database
  resReference.remove()
});

// Display reservations
function getReservations(){
   // Listen for changes in res data
  database.ref('reservations').on('value', function (results) {
    // Get all res stored in the results we received back from Firebase
    var allReservations = results.val();
     // Set an empty array where we can add all res we'll append to the DOM
    var reservations = [];
        // iterate (loop) through all res coming from database call
    for (var i in allReservations) {
      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[i].name,
        day: allReservations[i].day,
        resId: i
      };

     // Get the HTML from our Handlebars res template
      var source = $("#res-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);
      // Pass the data for this res (context) into the template
      var resListElement = template(context);
      // push newly created element to array of res
      reservations.push(resListElement)
    }
    // remove all list items from DOM before appending list items
    $('.all-reservations').empty()
    // append each comment to the list of comments in the DOM
    for (var i in reservations) {
      $('.all-reservations').append(reservations[i])
    }
  });
};

  getReservations();


  var token = '7153806719.ef372ff.d576df13cb404317bb58a170e3d1d488'; // learn how to obtain it below
   var num_photos = 6;
 
$.ajax({
	url: 'https://api.instagram.com/v1/users/self/media/recent',
	dataType: 'jsonp',
	type: 'GET',
	data: {access_token: token, count: num_photos},
	success: function(data){
 		console.log(data);
		for( x in data.data ){
			$('#rudr_instafeed').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');
		}
	},
	error: function(data){
		console.log(data);
	}
});
