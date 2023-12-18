// JavaScript code to handle event interactions

document.getElementById('create-button').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the form from being submitted on button click
    createEvent();
});

document.getElementById('edit-button').addEventListener('click', function () {
    editEvent();
});

// document.getElementById('create-event-form').addEventListener('submit', function (e) {
//     e.preventDefault(); 
//     saveEvent();
// });

let events = [];

function createEvent() {
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    if (eventName && eventDate) {
        const newEvent = { name: eventName, date: eventDate, _id: Date.now().toString() };

        events.push(newEvent);

        updateEventList();

        addEventToDatabase(newEvent);
        // Clear the input fields
        document.getElementById('event-name').value = '';
        document.getElementById('event-date').value = '';
    }
}

function editEvent() {
    const eventNameToEdit = document.getElementById('edit-event-name').value;
    const newEventDate = document.getElementById('new-event-date').value;
    if (eventNameToEdit && newEventDate) {
        const eventIndex = events.findIndex(event => event.name === eventNameToEdit);
        if (eventIndex !== -1) {
            events[eventIndex].date = newEventDate;
            updateEventList();

            // Clear the input fields
            document.getElementById('edit-event-name').value = '';
            document.getElementById('new-event-date').value = '';
        }
    }
}

function deleteEvent(eventName) {
    events = events.filter(event => event.name !== eventName);
    updateEventList();
}

function updateEventList() {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${event.name} (Date: ${event.date}) <button onclick="deleteEvent('${event.name}')">Delete</button>`;
        eventList.appendChild(listItem);
    });
}

function addEventToDatabase(event) {
    console.log("Save event is called");
    // const eventName = document.getElementById('event-name').value;
    // const eventDate = document.getElementById('event-date').value;
    // if (eventName && eventDate) {
    //     const newEvent = { name: eventName, date: eventDate };
    fetch('/create-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    })
        .then((response) => {
            if (response.status === 201) {
                // Event created successfully, you can update the UI or fetch all events again
                //fetchEvents(); // Update the event list
            } else {
                console.error('Failed to create event');
            }
        })
        .catch((error) => console.error('Failed to create event:', error));

    console.log("it has fetched the data");
}



