import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Header from "./Header";
import "./Layout.css";
import Footer from "./Footer";
function Layout(props: {favorites: [value: number[],setValue : React.Dispatch<React.SetStateAction<number[]>>]}) {
  
  return (
    <Routes>
      <Route path="/" element={
      <main id="homeP">
        <Header mini/>
        <Home favorites={props.favorites}/>
        <Footer />
      </main>
       } />
      <Route path="movies/:id" element={
        <main id="movieP">
          <Header sidebar/>
          <Movie favorites={props.favorites} />
        </main>
      } />

    </Routes>
  );
}

export default Layout;
