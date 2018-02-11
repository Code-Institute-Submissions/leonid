const current = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');
const opacity = 0.6;

//Set first img opacity
imgs[0].style.opacity = opacity;

imgs.forEach(img => img.addEventListener('click', imgClick));

function imgClick(e) {
  //Reset opacity
  imgs.forEach(img => (img.style.opacity = 1));

  //Change current image to src of clicked img
  current.src = e.target.src;

  //Add fadein class
  current.classList.add('fade-in');

  //Remove fadein class after .5s
  setTimeout(() => current.classList.remove('fade-in'), 500);

  //Change the opacity to the opacity var
  e.target.style.opacity = opacity;
}


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCBQuuw5SK-zfdFr0eiWA2iqff4n_EvfbM",
    authDomain: "leonid-contact.firebaseapp.com",
    databaseURL: "https://leonid-contact.firebaseio.com",
    projectId: "leonid-contact",
    storageBucket: "",
    messagingSenderId: "824617768783"
  };
  firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

//listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();
  //get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // save message
  saveMessage(name, email, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

//function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message){
  var newMessagesRef = messagesRef.push();
  newMessagesRef.set({
    name: name,
    email: email,
    message: message
  });
}
