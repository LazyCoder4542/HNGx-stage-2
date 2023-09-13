import React, { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import NetworkStatusIndicator from "./components/mini/NetworkStatusIndicator";

function App() {
  const [favorites, setFavorites] = useState<number[]>(localStorage.getItem("user-favourites") ? JSON.parse(localStorage.getItem("user-favourites") as string) : [])
  useEffect(() => {
    localStorage.setItem("user-favourites", JSON.stringify(favorites))
  }, [favorites])
  return (
    <>
    <NetworkStatusIndicator/>
    <Layout favorites={[favorites, setFavorites]}/>
    </>
  );
}

export default App;
