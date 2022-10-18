## Firebase Test Project


## Tools
- Reactjs
- MaterialUI
- firebase
- react-router-dom

## Step Guide
- Create firebase account
- install firebase sdk with npm install firebase
- initialize firebase app with

## Step Guide for Google Login

For more description go to https://firebase.google.com/docs/auth/web/google-signin.
- enable google login provider for go to project dashboard  => Authentication
 => sign-in-method and add new google auth provider
- import GoogleAuthProvider from firebase/auth and create instance object
- import getAuth function that return auth object
- if you want to choose account with popup box then use signInWithPopup, that is 
import from firebase/auth.
- signInWithPopup take two parameter first auth, second provider
- if successfully sign in return user information that is an object.
- if you want to redirect login then use signInWithRedirect.

## Step Guide for Email Password Login

For more description go to https://firebase.google.com/docs/auth/web/password-auth.
- enable google login provider for go to project dashboard  => Authentication
  => sign-in-method and add Email/Password provider
- import createUserWithEmailAndPassword from firebase auth.
- import getAuth function that return auth object
- call createUserWithEmailAndPassword function with three args like auth, email, password
- if successfully sign in return user information that is an object.
- For sign in to call signInWithEmailAndPassword method and password there auth, email, password

## For logout 
-  import signOut from firebase/auth
- call it with pass args auth

## for UpdateProfile 
-  import updateProfile from firebase/auth
- call it with two args first auth.currentUser and user data object. like {displayName, photoURL}
- also you can update you email updateEmail function
```js
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();
//  return promise
updateProfile(auth.currentUser, {
  displayName: "updated name", photoURL: "image link"
})
```

## Send a user a verification email
```js
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();
// return promise
sendEmailVerification(auth.currentUser) 
// Email verification sent!
```

## Get Currently signed-in user
- import onAuthStateChanged from firebase auth
- and call it with two args auth, and callback that get logged user object params
```js

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
  } else {
    // User is signed out
  }
});
```