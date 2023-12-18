// JavaScript (script.js)
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var question = document.getElementById('question').value;

    // Do something with the form values (e.g., send an email, save to a database)
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Question:', question);
});










// $(document).ready(function() {
//     $('#signup-btn').click(function (e) {
//        e.preventDefault(); // Prevent the default form submission

//         $.ajax({
//             url: '/signup',
//             type: 'POST',
//             cache: false,
//             data: {
//                 name: $('#name').val(),
//                 classYear: $('#classYear').val(),
//                 email: $('#email').val(),
//                 password: $('#password').val(),
//                 confirmPassword: $('#confirmPassword').val()
//             },
//             success: function () {
//                 $('#error-group').css('display', 'none');
//                 alert('Your submission was successful');
//             },
//             error: function (data) {
//                 $('#error-group').css('display', 'block');
//                 var errors = JSON.parse(data.responseText);
                
//                 var errorsContainer = $('#errors');
//                 //errorsContainer.empty(); // Clear any previous errors

//                 var errorsList = '';
//                 for (var i = 0; i < errors.length; i++) {
//                     errorsList += '<li>' + errors[i].msg + '</li>';
//                 }
//                 errorsContainer.html(errorsList);
//             }
//         });
//     });
// });





// $('#signup-btn').click(function () {
//     $.ajax({
//         url: '/signup',
//         type: 'POST',
//         cache: false,
//         data: {
//             name: $('#name').val(),
//             classYear: $('#classYear').val(),
//             email: $('#email').val(),
//             password: $('#password').val(),
//             confirmPassword: $('#confirmPassword').val()
//         },
//         success: function () {
//             $('#error-group').css('display', 'none');
//             alert('Your submission was successful');
//         },
//         error: function (data) {
//             $('#error-group').css('display', 'block');
//             var errors = JSON.parse(data.responseText);
//             var errorsContainer = $('#errors');
//             errorsContainer.innerHTML = '';
//             var errorsList = '';
//             for (var i = 0; i < errors.length; i++) {
//                 errorsList += '<li>' + errors[i].msg + '</li>';
//             }
//             errorsContainer.html(errorsList);
//         }
//     });
// });











// $(document).ready(function() {
//     $('#signup-btn').click(function (e) {
//         e.preventDefault(); // Prevent the default form submission

//         $.ajax({
//             url: '/signup',
//             type: 'POST',
//             data: {
//                 name: $('#name').val(),
//                 classYear: $('#classYear').val(),
//                 email: $('#email').val(),
//                 password: $('#password').val(),
//                 confirmPassword: $('#confirmPassword').val()
//             },
//             success: function (data) {
//                 $('#error-group').css('display', 'none');
//                 alert('Your submission was successful');
//             },
//             error: function (xhr, status, error) {
//                 $('#error-group').css('display', 'block');
//                 var errors = JSON.parse(xhr.responseText);
//                 var errorsContainer = $('#errors');
//                 errorsContainer.empty(); // Clear any previous errors

//                 for (var i = 0; i < errors.length; i++) {
//                     errorsContainer.append('<li>' + errors[i].msg + '</li>');
//                 }
//             }
//         });
//     });
// });