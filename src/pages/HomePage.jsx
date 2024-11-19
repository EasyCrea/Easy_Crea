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
      <button>
        <Link to="/loginCreateur">Login Createur</Link>
      </button>
      <button>
        <Link to="/loginAdmin">Login Admin</Link>
      </button>
    </div>
  );
};

export default HomePage;
