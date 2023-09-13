import { ReactComponent as IMDBIcon } from "./../assets/icons/imdb.svg";
import { ReactComponent as RTIcon } from "./../assets/icons/rotten_tomato.svg";
import { ReactComponent as PlayIcon } from "./../assets/icons/Play.svg";
import { ReactComponent as HeartIcon } from "./../assets/icons/Heart.svg";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { DataI } from "../@types/data";
import { Link } from "react-router-dom";
interface pageDataI {
  movies: DataI | null;
  introMovies: DataI | null;
}
function Home() {
  const [pageData, setPageData] = useState<pageDataI>({
    movies: null,
    introMovies: null,
  });

  // INDIVIDUAL MOVIES https://api.themoviedb.org/3/movie/{MOVIE_ID}?append_to_response=recommendations,credits&language=en-US
  const fetchMovies = async () => {
    const url = process.env.REACT_APP_API_URL + "/movie/top_rated";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
      },
    };

    return fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        return {
          ...json,
          results: json.results.splice(0, 10),
        };
      })
      .catch((err) => console.error("error:" + err));
  };
  const fetchIntroMovies = async () => {
    const url =
      process.env.REACT_APP_API_URL +
      "/discover/movie?include_adult=true&include_video=false&language=en-US&primary_release_year=2023&sort_by=vote_average.desc.desc&vote_average.gte=7";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
      },
    };

    return fetch(url, options)
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.error("error:" + err));
  };
  useEffect(() => {
    let data = {
      movies: null,
      introMovies: null,
    };
    fetchMovies()
      .then((json) => (data.movies = json ? json : null))
      .then(() => {
        fetchIntroMovies()
          .then((json) => (data.introMovies = json ? json : null))
          .then(() => {
            console.log(data);
            setPageData(data);
          });
      });
  }, []);
  return (
    <>
      <section id={style.intro}>
        <div className={style.hero}>
          <img src="./test_hero.jpeg" alt="hero" />
        </div>
        <header>
          <h1>John Wick 3: Parabellum</h1>
          <div className={style.ratings}>
            <div>
              <span>
                <IMDBIcon />
              </span>
              <span>86.0 / 100</span>
            </div>
            <div>
              <span>
                <RTIcon />
              </span>
              <span>97%</span>
            </div>
          </div>
          <p>
            John Wick is on the run after killing a member of the international
            assassins' guild, and with a $14 million price tag on his head, he
            is the target of hit men and women everywhere.
          </p>
          <div className={"button " + style.button}>
            <span>
              <PlayIcon />
            </span>
            <span>WATCH TRAILER</span>
          </div>
        </header>
      </section>
      <section id={style.featured}>
        <header>
          <h2>Top Rated Movies</h2>
        </header>
        {pageData.movies ? (
          <div className={style.movies}>
            {pageData.movies.results.map((movie) => {
              return (
                <Link to={"movie/" + movie.id} key={movie.id}>
                  <div data-testid="movie-card">
                    <div className={style.image}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        data-testid="movie-poster"
                      />
                    </div>
                    <div data-testid="movie-release-date">
                      {movie.release_date}
                    </div>
                    <div data-testid="movie-title">{movie.original_title}</div>
                    <div className={style.ratings}>
                      <div>
                        <span>
                          <IMDBIcon />
                        </span>
                        <span>{movie.vote_average * 10} / 100</span>
                      </div>
                      <div>
                        <span>
                          <RTIcon />
                        </span>
                        <span>{movie.vote_average * 10}</span>
                      </div>
                    </div>
                    <div className={style.genre}>
                      {["Action", "Adventure", "Horror"].join(", ")}
                    </div>
                    <div>
                      <div>
                        <span>
                          <HeartIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <p>Something went wrong!!!</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Home;