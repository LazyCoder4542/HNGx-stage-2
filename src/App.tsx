import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import NetworkStatusIndicator from "./components/mini/NetworkStatusIndicator";

function App() {
  return (
    <>
    <NetworkStatusIndicator/>
    <Layout/>
    </>
  );
}

export default App;
