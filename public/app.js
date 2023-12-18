function showEvents(eventType) {
    // Get the base URL
    let baseUrl = window.location.origin + '/event-display';

    // Update the URL based on the event type
    let newUrl;
    switch (eventType) {
        case 'allEvents':
            newUrl = baseUrl;
            break;
        case 'myEvents':
            newUrl = baseUrl + '/myevents';
            break;
        case 'rsvpEvents':
            newUrl = baseUrl + '/rsvpevents';
            break;
        default:
            newUrl = baseUrl;
    }

    // Change the URL
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Perform actions to display events based on the event type (you can modify this logic)
    // For example, show/hide event sections based on the selected event type
    const allEventsSection = document.getElementById('allEventsSection');
    const myEventsSection = document.getElementById('myEventsSection');
    const rsvpEventsSection = document.getElementById('rsvpEventsSection');

    switch (eventType) {
        case 'allEvents':
            allEventsSection.style.display = 'block';
            myEventsSection.style.display = 'none';
            rsvpEventsSection.style.display = 'none';
            break;
        case 'myEvents':
            allEventsSection.style.display = 'none';
            myEventsSection.style.display = 'block';
            rsvpEventsSection.style.display = 'none';
            break;
        case 'rsvpEvents':
            allEventsSection.style.display = 'none';
            myEventsSection.style.display = 'none';
            rsvpEventsSection.style.display = 'block';
            break;
        default:
            // Default action, if needed
            break;
    }
}


// Example function to handle RSVP button click
$('.rsvp-btn').on('click', function() {
    const eventId = $(this).data('event-id');
    // Assuming you have the user's unique ID stored in a variable userId
    const userId = $(this).data('name'); // Replace with the actual user ID
    console.log(eventId, userId); //to see what's been saved for debugging
  
    // Make an AJAX request to the server to save the RSVP
    $.ajax({
      method: 'POST',
      url: '/saveRsvp',
      data: {
        eventId: eventId,
        userId: userId
      },
      success: function(response) {
        // Handle success - maybe show a message or update the RSVP events section
        console.log("The id has been retrieved", response);
        $('#successMessage').show();
      },
      error: function(err) {
        // Handle error
        console.error('Error during RSVP:', err);
      }
    });
  });
  




































// document.addEventListener('DOMContentLoaded', function() {
//     // Select all RSVP buttons
//     const rsvpButtons = document.querySelectorAll('.rsvp-btn');
//     // Event listener for each RSVP button
//     rsvpButtons.forEach(button => {
//         button.addEventListener('click', function(event) {
//             // Retrieve event details based on the clicked button's attributes or parent elements
//             const eventId = event.target.getAttribute('data-event-id'); // Assuming the button has a data-event-id attribute

//             // Fetch event details based on eventId from the server/database
//             fetch(`/listEvents/${eventId}`) // Replace with your actual endpoint
//                 .then(response => response.json())
//                 .then(selectedEvent => {
//                     // Perform actions with the selectedEvent data (in this case, rendering with Mustache)
//                     renderEventDetails(selectedEvent);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching event details:', error);
//                 });
//         });
//     });
// });



// RSVP button click event handler

// JavaScript (script.js)
// Simulate a login process
// const userName = $(this).data('name'); // Replace with actual user name from login

// document.querySelector('.btn').addEventListener('click', function() {
//     const rsvpEvent = req.session.user;
    
//     // Save the RSVP event under the user's name
//     localStorage.setItem(userName, rsvpEvent);
    
//     // Display the RSVP information
//     document.getElementById('rsvpEventsSection').innerText = `RSVP by ${userName}: ${rsvpEvent}`;
// });

// $('.rsvp-btn').on('click', function (event) {
//     event.preventDefault(); // Prevent default form submission behavior (if using a form)
    
//     const eventId = $(this).data('event-id'); // Get event ID from data attribute
//     // Make AJAX POST request to save RSVP
//     $.ajax({
//         type: 'POST',
//         url: '/rsvp', // Endpoint to handle RSVP
//         data: { eventId: eventId }, // Send event ID or necessary data
//         success: function (response) {
//             // Upon successful RSVP, update the RSVP section
//             // Assuming response contains updated RSVP events
//             const updatedRSVPs = response.updatedRSVPs; // Example response structure
//             const template = $('#rsvp-events-template').html(); // Get Mustache template
//             const rendered = Mustache.render(template, { rsvpevents: updatedRSVPs }); // Render Mustache template with updated data
//             $('#rsvpEventsSection').html(rendered); // Update RSVP section with new RSVP event
//         },
//         error: function (err) {
//             console.error('Error during RSVP:', err);
//         }
//     });
// });

// // Cancel button click event handler
// $(document).on('click', '.cancel-btn', function () {
//     const eventId = $(this).data('event-id');
//     // Perform Cancel RSVP action here:
//     // - Send a request to the server to remove the event
//     // - Update the RSVP section by removing the canceled event
//     $.ajax({
//         type: 'POST',
//         url: '/cancel-rsvp',
//         data: { eventId: eventId },
//         success: function (response) {
//             // Handle success (update UI, etc.)
//             console.log('Cancelled RSVP for event ID:', eventId);
//         },
//         error: function (err) {
//             // Handle errors
//             console.error('Error during RSVP cancellation:', err);
//         }
//     });
// });



// Function to show/hide content based on selected event type
// function showEvents(eventType) {
//     const allEventsSection = document.getElementById('allEventsSection');
//     const myEventsSection = document.getElementById('myEventsSection');
//     const rsvpEventsSection = document.getElementById('rsvpEventsSection');

//     // Hide all sections by default
//     allEventsSection.style.display = 'none';
//     myEventsSection.style.display = 'none';
//     rsvpEventsSection.style.display = 'none';

//     // Show content based on selected event type
//     if (eventType === 'allEvents') {
//         allEventsSection.style.display = 'block';
//     } else if (eventType === 'myEvents') {
//         myEventsSection.style.display = 'block';
//     } else if (eventType === 'rsvpEvents') {
//         rsvpEventsSection.style.display = 'block';
//     }
// }

// // Display 'All Events' section by default
// window.onload = function () {
//     showEvents('allEvents');
// };
