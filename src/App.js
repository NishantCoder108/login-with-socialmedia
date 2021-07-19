import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

var firebaseConfig = {
  apiKey: "AIzaSyDkGuD78ZzKAR78NhHpHkuumb0S8qOuMJI",
  authDomain: "fir-auth-tut-f6dbf.firebaseapp.com",
  projectId: "fir-auth-tut-f6dbf",
  storageBucket: "fir-auth-tut-f6dbf.appspot.com",
  messagingSenderId: "161979635773",
  appId: "1:161979635773:web:5a20db73f46d23c2d0b254",
  measurementId: "G-J29CY35CX3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase.analytics();
class App extends Component {
  state = { isSignedIn: false };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      // console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <>
            <div className="card">
              <h3> Hi {firebase.auth().currentUser.displayName}</h3>
              <img
                alt="profile picture"
                src={firebase.auth().currentUser.photoURL}
              />
              <ul>
                <li> Email: {firebase.auth().currentUser.email}</li>
                <li>
                  {" "}
                  Phone Number : {firebase.auth().currentUser.phoneNumber}
                </li>
                <li> UID : {firebase.auth().currentUser.uid}</li>
              </ul>
              <div>Signed In</div>
              <button onClick={() => firebase.auth().signOut()}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="App-header">
            <h1> SIGN IN</h1>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
