import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Navigation from "./componene/Navigation.jsx";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";

//initialize firebase app
import "./firebase/index.js";

const initialState = {
  auth: null,
};

function reducer(state, action) {
  let updatedState = { ...state };
  if (action.type === "LOGIN") {
    updatedState.auth = action.payload;
  }

  return updatedState;
}

function App() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Navigation auth={state.auth} dispatch={dispatch} />

      <Routes>
        <Route path={"/"} element={<h1>HOme page</h1>} />
        <Route path="/login" element={<LoginPage dispatch={dispatch} />} />
        <Route
          path="/registration"
          element={<RegistrationPage dispatch={dispatch} />}
        />
      </Routes>
    </div>
  );
}

export default App;
