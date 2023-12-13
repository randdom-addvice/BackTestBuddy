import React from "react";
import Layout from "../components/Layout";
import { withApollo } from "../graphql/withApollo";

const Home = () => {
  return <Layout>Home Page</Layout>;
};

export default withApollo(Home);
