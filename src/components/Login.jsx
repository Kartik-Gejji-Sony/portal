import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import "../App.css";
import { Button } from "@mui/material";

export const Login = () => {
  const { oktaAuth } = useOktaAuth();
  const handleSignin = () => {
    oktaAuth.signInWithRedirect({ originalUri: "/home" });
  }
  return (
    <div style={{ textAlign: "center", position: "relative", top: "200px" }}>

      <div >
        <h1 style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: '50px' }}>VIS-PM-PORTAL</h1>
      </div>
      <Button variant="contained" style={{ position: "relative", left: "40px" }} onClick={handleSignin}>SignIn</Button>

    </div>
  );
}

