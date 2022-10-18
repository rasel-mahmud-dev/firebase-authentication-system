import React, { useState } from "react";
import {
  Alert,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const LoginPage = ({ dispatch }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    for (const dataKey in userData) {
      if (!userData[dataKey]) {
        setErrorMessage("please provide " + dataKey);
        return;
      } else if (dataKey === "password" && userData[dataKey].length < 6) {
        setErrorMessage("Password should be at least 6 character");
        return;
      }
    }
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      if (!result.user.emailVerified) {
        return sendEmailVerification(auth.currentUser)
          .then(() => {
            setErrorMessage(
              "Please Verify your email address, we just send mail to your mail, check it."
            );
          })
          .catch((ex) => {
            setErrorMessage("Please Verify your email address");
          });
      }

      dispatch({
        type: "LOGIN",
        payload: {
          displayName: result.user.displayName,
          email: result.user.email,
          userId: result.user.uid,
          photoURL: result.user.photoURL,
        },
      });
    } catch (ex) {
      setErrorMessage(ex.message);
    }
  }

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

  async function loginWithGithub() {
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

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box
          boxSizing={"border-box"}
          borderRadius={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "100px",
            boxShadow: 6,
            p: "20px",
          }}
        >
          <Typography
            variant="h3"
            fontSize={40}
            fontWeight={"bold"}
            sx={{ textAlign: "center", mt: "10px" }}
          >
            Login Here
          </Typography>

          {errorMessage && (
            <Alert variant="solid" color="error">
              {errorMessage}
            </Alert>
          )}

          <FormControl
            sx={{ m: 1 }}
            variant="outlined"
            boxSizing={"border-box"}
          >
            <TextField
              boxSizing={"border-box"}
              required={true}
              id="standard-basic"
              label="Email"
              variant="standard"
              name="email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <TextField
              required={true}
              id="standard-basic"
              label="Password"
              name="password"
              variant="standard"
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: "30px" }}
          >
            Login
          </Button>

          <Box sx={{ mt: "20px" }}>
            <Typography variant="p">
              Don't have a Account ?
              <Typography variant={"p"} fontWeight={"bold"}>
                <Link to="/registration">Create an account</Link>
              </Typography>
            </Typography>
          </Box>

          <Divider sx={{ "--Divider-childPosition": `50%`, my: "40px" }}>
            <Typography fontWeight={"bold"}>Or</Typography>
          </Divider>

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <Button onClick={loginWithGoogle} variant="contained" color="error">
              Login with Google
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={loginWithFacebook}
            >
              Login with Facebook
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={loginWithGithub}
            >
              Login with Github
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
