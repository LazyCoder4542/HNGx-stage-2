import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import NetworkStatusIndicator from "./components/mini/NetworkStatusIndicator";

function App() {
  const url = 'https://api.themoviedb.org/3/authentication';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzlmNTVkNzYyYTAyYTEyMzBlNmM0Nzk0YTIxZWNmOCIsInN1YiI6IjYzZjIzOWVkYTY3MjU0MDA4NjVkYThmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iEyFzMdwxT9vZIupxOSfSr8j7w1ow1-H-bBbixyva0U'
    }
  };
  
  // fetch(url, options)
  //   .then(res => res.json())
  //   .then(json => console.log(json))
  //   .catch(err => console.error('error:' + err));
  return (
    <>
    <NetworkStatusIndicator/>
    <Layout/>
    </>
  );
}

export default App;
