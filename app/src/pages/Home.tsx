import { AppRoutes } from "@/routes/routesDeclaration";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return <div>
    <h1>Home</h1>
    <Link to={AppRoutes.LIBRARIES}>Go to Dashboard</Link>
  </div>;
};

export default Home;
