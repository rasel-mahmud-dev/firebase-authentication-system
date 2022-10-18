# Firebase Authentication Project

## Features
- Google, Facebook, Github, Password login system
- Firestore (Firebase NoSQL Database)
- Firebase hosting

## Live Preview https://hero-test-auth.web.app

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

Example code
```js

import { GoogleAuthProvider, getAuth } from "firebase/auth";
const auth = getAuth();

async function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      dispatch({
        type: "LOGIN",
        payload: {
          displayName: user.displayName,
          email: user.email,
          userId: user.uid,
          photoURL: user.photoURL,
        },
      });
    } catch (ex) {
      setErrorMessage(ex.message);
    }
  }

```


## Step Guide for GitHub Login

For more description go to https://firebase.google.com/docs/auth/web/github-auth
- enable GitHub login provider for go to project dashboard  => Authentication
- collect github Client ID  and Client secrets from GitHub developer page
  => sign-in-method and add new GitHub auth provider put this credentials
- import GithubAuthProvider from firebase/auth and create instance object

Example code
```js

import { GithubAuthProvider, getAuth } from "firebase/auth";
const auth = getAuth();

async function loginWithGoogle() {
    const githubProvider = new GithubAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, githubProvider);
      dispatch({
        type: "LOGIN",
        payload: {
          displayName: user.displayName,
          email: user.email,
          userId: user.uid,
          photoURL: user.photoURL,
        },
      });
    } catch (ex) {
      setErrorMessage(ex.message);
    }
  }
```

## Step Guide for Facebook Login

For more description go to https://firebase.google.com/docs/auth/web/facebook-login
- collect facebook Client ID and Client secrets from Facebook developer page https://developers.facebook.com
- enable Facebook login provider for go to project dashboard  => Authentication => sign-in-method and add new GitHub auth provider put this credentials
- import FacebookAuthProvider from firebase/auth and create instance object

Example code
```js

import { FacebookAuthProvider, getAuth } from "firebase/auth";
const auth = getAuth();

async function loginWithFacebook() {
	const facebookProvider = new FacebookAuthProvider();
	try {
		const { user } = await signInWithPopup(auth, facebookProvider);
		dispatch({
			type: "LOGIN",
			payload: {
				displayName: user.displayName,
				email: user.email,
				userId: user.uid,
				photoURL: user.photoURL,
			},
		});
	} catch (ex) {
		setErrorMessage(ex.message);
	}
}
```

## Step Guide for Email Password Login

For more description go to https://firebase.google.com/docs/auth/web/password-auth.
- enable google login provider for go to project dashboard  => Authentication
  => sign-in-method and add Email/Password provider
- import createUserWithEmailAndPassword from firebase auth.
- import getAuth function that return auth object
- call createUserWithEmailAndPassword function with three args like auth, email, password
- if successfully sign in return user information that is an object.
- For sign in to call signInWithEmailAndPassword method and password there auth, email, password

Example code
```js
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth();

async function loginWithPassword() {
	const result = await signInWithEmailAndPassword(
		auth,
		userData.email,
		userData.password
	);
	if (!result.user.emailVerified) {
		// email varificaton mail send
		return sendEmailVerification(auth.currentUser)
			.then(() => {
				setErrorMessage(
					"Please Verify your email address, we just send mail to your mail, check it."
				);
			})
			.catch((ex) => {
				setErrorMessage("Please Verify your email address");
			});
	} else {
		// verifiyed email login sucess 
    }
  }
```

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


# Deploy On Firebase as static 
- go to more details https://firebase.google.com/docs/hosting/quickstart
- install the Firebase CLI tools 
- Initialize your project
- Deploy to your site command
 
To install firebase cli
```shell
npm install -g firebase-tools
```

Login your firebase account from command line
```shell
firebase login
```

After login Initialize your project
```shell
firebase init hosting or firebase init hosting
```
if init then choose (*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
- create one if you want host new site
- set public directory whatever you want

if success, it will write your root directory firebase.json and .firebaserc directory
**Now initialized firebase project**

For Manually deploy or update site
```shell
firebase deploy
```
for history fallback react app use rewrites

```json
// firebase.json 
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites":[{"source":"**","destination":"/index.html"}]
  }
}

```