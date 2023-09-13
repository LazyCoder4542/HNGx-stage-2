import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Header from "./Header";
import "./Layout.css";
function Layout() {
  return (
    <Routes>
      <Route path="/" element={
      <main id="homeP">
        <Header mini/>
        <Home />
      </main>
       } />
      <Route path="movie/:id" element={
        <main id="movieP">
          <Header sidebar/>
          <Movie />
        </main>
      } />

    </Routes>
  );
}

export default Layout;
