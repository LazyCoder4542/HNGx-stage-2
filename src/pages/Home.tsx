import { ReactComponent as IMDBIcon } from "./../assets/icons/imdb.svg";
import { ReactComponent as RTIcon } from "./../assets/icons/rotten_tomato.svg";
import { ReactComponent as PlayIcon } from "./../assets/icons/Play.svg";
import { ReactComponent as HeartFIcon } from "./../assets/icons/Heart.svg";
import { ReactComponent as HeartLIcon } from "./../assets/icons/Heartlined.svg";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, A11y, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import { DataI } from "../@types/data";
import { Link } from "react-router-dom";
import { IPopupContext, usePopup } from "../components/mini/popupContext";
interface pageDataI {
  movies: DataI | null;
  introMovies: DataI | null;
}
function Home(props: {
  favorites: [
    value: number[],
    setValue: React.Dispatch<React.SetStateAction<number[]>>
  ];
}) {
  const { triggerPopup } = usePopup() as IPopupContext;
  const [pageData, setPageData] = useState<pageDataI>({
    movies: null,
    introMovies: null,
  });
  const swiper = useSwiper();
  console.log(swiper)
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
      "/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&vote_average.gte=7&vote_count.gte=1000";
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
  const arry = [4, 5, 1, 2, 3];
  console.log(arry);
  
  return (
    <>
      <section id={style.intro}>
        {pageData.introMovies ? (
          <Swiper
            modules={[Pagination, A11y, Autoplay, Parallax]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            draggable={false}
            autoplay={{
              delay: 5000,
            }}
            parallax={true}
            id="intro_slide"
          >
            {[
              ...pageData.introMovies.results.filter(
                (el) => el.backdrop_path !== null
              ),
            ]
              .splice(0, 5)
              .map((movie) => {
                return (
                  <SwiperSlide key={movie.id}>
                    <div className={style.movie_box}>
                      <div className={style.hero}>
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                          alt={movie.title}
                        />
                      </div>
                      <header>
                        <h1
                          data-swiper-parallax="-500"
                          data-swiper-parallax-duration="400"
                        >
                          <a href={"/movie/" + movie.id}>
                            {movie.original_title}
                          </a>
                        </h1>
                        <div
                          className={style.ratings}
                          data-swiper-parallax="-500"
                          data-swiper-parallax-duration="600"
                        >
                          <div>
                            <span>
                              <IMDBIcon />
                            </span>
                            <span>
                              {(movie.vote_average * 10).toFixed(1)} / 100
                            </span>
                          </div>
                          <div>
                            <span>
                              <RTIcon />
                            </span>
                            <span>{movie.vote_average * 10}</span>
                          </div>
                        </div>
                        <p
                          data-swiper-parallax="-500"
                          data-swiper-parallax-duration="600"
                        >
                          {movie.overview}
                        </p>
                        <div
                          className={"button " + style.button}
                          data-swiper-parallax="-500"
                          data-swiper-parallax-duration="600"
                        >
                          <span>
                            <PlayIcon />
                          </span>
                          <span>WATCH TRAILER</span>
                        </div>
                      </header>
                    </div>
                  </SwiperSlide>
                );
              })}
            {/* {
            Array.from(
              (
                document.querySelector(".swiper-pagination") as HTMLDivElement
              ).querySelectorAll("span") as NodeListOf<HTMLSpanElement>
            ).map((element) => {
              console.log(element);
              
              return <></>;
            })} */}
          </Swiper>
        ) : null}
        {/* <div className={style.movie_box}>
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
        </div> */}
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
                        <span>
                          {(movie.vote_average * 10).toFixed(1)} / 100
                        </span>
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
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            if (movie) {
                              let id = movie.id;
                              if (props.favorites[0].includes(id)) {
                                props.favorites[1]((prev) => {
                                  return prev.filter((el) => el !== id);
                                });
                                triggerPopup("Removed from favourites");
                              } else {
                                props.favorites[1]((prev) => {
                                  return prev.concat([id]);
                                });
                                triggerPopup("Added to favourites");
                              }
                            }
                          }}
                        >
                          {props.favorites[0].includes(movie.id) ? (
                            <HeartFIcon />
                          ) : (
                            <HeartLIcon />
                          )}
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
