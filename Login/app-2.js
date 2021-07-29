// Your web app's Firebase configuration (ENTER YOUR FIREBASE CONFIGURATION DETAILS)
var firebaseConfig = {
    apiKey: "AIzaSyC2OwYTv-0pAHF9EceU8en6vwrNFxK0jO0",
    authDomain: "login-filmdom.firebaseapp.com",
    projectId: "login-filmdom",
    storageBucket: "login-filmdom.appspot.com",
    messagingSenderId: "721827050356",
    appId: "1:721827050356:web:1b6bd73cdcbf14d100f221",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var form = document.querySelector('#loginForm');
var r_form = document.querySelector('#registerForm');
var reset_form = document.querySelector('#resetForm');
var message = document.querySelector('#messageDiv');
var message_value = document.querySelector('.message');
var sign_out = document.querySelector("#signOut");

// check if user is logged in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if(window.location.pathname != '/../1. Andre/index.html'){
            window.location = '../1. Andre/index.html';
        }
    } else {
        if(window.location.pathname === '/../1. Andre/index.html'){
            window.location = 'index-2.html';
        }
    }
});

// user login
if(form){
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let email = form.email.value;
        let password = form.password.value;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location = '../1. Andre/index.html';
        })
        .catch((error) => {
            message.style.display = 'block';
            message_value.innerText = error.message;
            setTimeout(function(){
                message.style.display = 'none';
            }, 3000);
        });
    })
}

// user register
if(r_form){
    r_form.addEventListener('submit', function(e) {
        e.preventDefault();
        let email = r_form.email.value;
        let password = r_form.password.value;
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.location = '../1. Andre/index.html';
        })
        .catch((error) => {
            message.style.display = 'block';
            message_value.innerText = error.message;
            setTimeout(function(){
                message.style.display = 'none';
            }, 3000);
        });
    })
}

// password reset 
if(reset_form){
    reset_form.addEventListener('submit', function(e) {
        e.preventDefault();
        let email = reset_form.email.value;
    
        firebase.auth().sendPasswordResetEmail(email)
        .then((userCredential) => {
            message.style.display = 'block';
            message_value.innerText = 'Email has been send!';
            window.location = 'index-2.html';
        })
        .catch((error) => {
            message.style.display = 'block';
            message_value.innerText = error.message;
            setTimeout(function(){
                message.style.display = 'none';
            }, 3000);
        });
    })
}

// sign out  
if(sign_out){
    sign_out.addEventListener('click', function(e) {
        firebase.auth().signOut().then(() => {
            window.location = 'index-2.html';
        }).catch((error) => {
        // An error happened.
        });
    })
}