// HomePage

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  console.log("HomePage -> user", user);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user.email}!</p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default HomePage;
