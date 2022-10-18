import React, { useState } from "react";
import { Alert, FormControl, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

const RegistrationPage = ({ dispatch }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const auth = getAuth();

  const [errorMessage, setErrorMessage] = useState("");

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
      const result = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // user created successfully
      if (result) {
        updateProfile(auth.currentUser, {
          displayName: userData.username,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {})
          .catch((ex) => {
            console.log(ex);
          });

        // send account verification mail
        if (!result.user.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setErrorMessage(
                "Please Verify your email address, we just send mail to your mail, check it."
              );
            })
            .catch((ex) => {
              setErrorMessage("Please Verify your email address");
            });
        } else {
          dispatch({
            type: "LOGIN",
            payload: {
              displayName: result.user.displayName,
              email: result.user.email,
              userId: result.user.uid,
              photoURL: result.user.photoURL,
            },
          });
        }

        return;
      }

      setErrorMessage("Please Try Again");
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
            Create an Account
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
              label="Username"
              variant="standard"
              name="username"
              onChange={handleChange}
            />
          </FormControl>

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
            Create
          </Button>

          <Box sx={{ mt: "20px" }}>
            <Typography variant="p">
              Already have an Account ?
              <Typography variant={"p"} fontWeight={"bold"}>
                <Link to="/login">Login here</Link>
              </Typography>
            </Typography>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default RegistrationPage;
