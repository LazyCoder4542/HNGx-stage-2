
import { ReactComponent as PlayIcon } from "./../assets/icons/Playsolid.svg";
import { ReactComponent as DropDownIcon } from "./../assets/icons/Expand_Arrow.svg";
import { ReactComponent as TwoTicketsIcon } from "./../assets/icons/Two_Tickets.svg";
import { ReactComponent as ListIcon } from "./../assets/icons/List.svg";
import { ReactComponent as ListWhiteIcon } from "./../assets/icons/List_white.svg";
import { ReactComponent as StarIcon } from "./../assets/icons/Star.svg";
import HeartFIcon from "./../assets/icons/heart-filled-y.png";
import HeartLIcon from "./../assets/icons/heart-lined-y.png";

import style from "./Movie.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { usePopup, IPopupContext } from "../components/mini/popupContext";
import { CastI, CrewI, DataI, MovieI } from "../@types/data";

interface Movie_CompleteI extends MovieI {
  belongs_to_collection: {
    id: number,
    name: string,
  }
  budget: number,
  credits: {
    cast: CastI,
    crew: CrewI
  },
  genres: {
    id: number,
    name: string
  }[]
  homepage: string
  imdb_id: string
  runtime: number
  similar: DataI
  [key: string|number]: any

}
interface pageDataI {
  movie: Movie_CompleteI | null,
  top_rated: DataI | null
}
function Movie(props: {favorites: [value: number[],setValue : React.Dispatch<React.SetStateAction<number[]>>]}) {
  const [pageData, setPageData] = useState<pageDataI>({
    movie: null,
    top_rated: null
  })
  const { triggerPopup } = usePopup() as IPopupContext
  let { id } = useParams()
  const removeDup = (arr: Array<any>) => {
    let arrM: Array<any> = [] 
    arr.forEach(el => {
      if (!arrM.includes(el)) {
        arrM.push(el)
      }
    })
    return arrM
  }
  const fetchMovie = useCallback(() => {
    const url = 
      process.env.REACT_APP_API_URL + `/movie/${id}?append_to_response=credits%2Csimilar%2Cvideos&language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY
      }
    };

    return fetch(url, options)
      .then(res => {
        if (res.status !== 200) {
          if (res.status === 404) {
            triggerPopup("Invalid movie id!")
          }
          else {
            triggerPopup("Api Error!")
          }
          return
        }
        return res.json()
      })
      .catch(err => console.log(err));
  }, [triggerPopup, id])
  const fetchTopRated = () => {
    var date_min = new Date(`01-${new Date().getMonth()}-${new Date().getUTCFullYear()}`).toISOString()
    var date_max = new Date().toISOString()
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${date_min}&primary_release_date.lte=${date_max}&sort_by=vote_average.desc&vote_count.gte=1000`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzlmNTVkNzYyYTAyYTEyMzBlNmM0Nzk0YTIxZWNmOCIsInN1YiI6IjYzZjIzOWVkYTY3MjU0MDA4NjVkYThmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iEyFzMdwxT9vZIupxOSfSr8j7w1ow1-H-bBbixyva0U'
      }
    };

    return fetch(url, options)
      .then(res => res.json())
      .catch(err => console.error('error:' + err));
  }
  useEffect(() => {
    fetchMovie().then(json => {
      if (json) {
        console.log(json);
        setPageData(prev => {
        return {...prev, movie: json}
        })
        fetchTopRated().then(data => {
          if (data) {
            console.log(data);
            setPageData(prev => {
            return {...prev, top_rated: data}
            })
          }
        })
      }
    })
  }, [fetchMovie])
  return (
    <section id={style.movie_details}>
      {
        pageData.movie ?
        <>
          <div className={style.image}>
          <img src={`https://image.tmdb.org/t/p/original${pageData.movie.backdrop_path}`} alt={pageData.movie.title} />
          <div>
            <div>
              <span>
                <PlayIcon />
              </span>
            </div>
            <div>Watch Trailer</div>
          </div>
          </div>
          <div className={style.container}>
            <aside>
              <div>
                <div className={style.heading}>
                  <h3>
                    {[pageData.movie.original_title, pageData.movie.release_date.split("-")[0], "PG-13", `${Math.floor(pageData.movie.runtime / 60)}h ${Math.floor(pageData.movie.runtime % 60)}m` ].join(" • ")}
                  </h3>
                  <div>
                    {
                      pageData.movie.genres.map(genre => {
                        return <div key={genre.id}>
                          {genre.name}
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className={style.description}>
                  <p>{pageData.movie.overview}</p>
                </div>
              </div>
              <div>
                <div>
                  <span>Director: </span>
                  <span>
                    {pageData.movie.credits.crew.filter((el) => el.job === "Director").map(el => {
                      return el.original_name
                    }).join(", ")}
                  </span>
                </div>
                <div>
                  <span>Writers: </span>
                  <span>
                  {removeDup(pageData.movie.credits.crew.filter((el) => el.department === "Writing").map(el => {
                      return el.original_name
                    })).join(", ")}
                  </span>
                </div>
                <div>
                  <span>Stars: </span>
                  <span>
                    {pageData.movie.credits.cast.filter(el => el.order < 3).map(el => {
                      return el.original_name
                    }).join(", ")}
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <span className="button">Top rated movie #65</span>
                  <span>Awards 9 nominations</span>
                  <span>
                    <DropDownIcon />
                  </span>
                </div>
              </div>
              <div>
                <h3>Top Cast</h3>
                <div>
                  {pageData.movie.credits.cast.filter(el => el.order < 4).map(character => {
                    return <div key={character.id}>
                      <div className={style.image}>
                        <img src={"https://image.tmdb.org/t/p/w200"+character.profile_path} alt="" />
                      </div>
                    </div>
                  })}
                </div>
              </div>
              <div>
                <h3>Similar movies</h3>
                <div>
                  {[...pageData.movie.similar.results].splice(0, 4).map(movie => {
                    return <div key={movie.id}>
                      <div className={style.image}>
                        <img src={"https://image.tmdb.org/t/p/w200"+movie.poster_path} alt="" />
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </aside>
            <aside>
              <div>
                <div>
                  <div>
                    <span
                    onClick={() => {
                      if (pageData.movie){
                        let id = pageData.movie.id
                        if (props.favorites[0].includes(id)) {
                          props.favorites[1](prev => {
                            return prev.filter(el => el !== id)
                          })
                          triggerPopup("Removed from favourites")
                        }
                        else {
                          props.favorites[1](prev => {
                            return prev.concat([id])
                          })
                          triggerPopup("Added to favourites")
                        }
                      }
                    }}
                    >
                      {
                        props.favorites[0].includes(pageData.movie.id) ?
                        <img src={HeartFIcon} alt="" /> :
                        <img src={HeartLIcon} alt="" />
                        
                      }
                    </span>
                  </div>
                  <div>
                    <span><StarIcon /></span>
                    <span>{pageData.movie.vote_average}</span>
                    <span>|</span>
                    <span>{pageData.movie.vote_count}</span>
                  </div>
                </div>
                <div>
                  <div className="button">
                    <span><TwoTicketsIcon /></span>
                    <span>See Showtimes</span>
                  </div>
                  <div className="button">
                    <span><ListIcon /></span>
                    <span>More watch options</span>
                  </div>
                </div>
                <div></div>
              </div>
              <div>
                <div className={style.images}>
                  {
                    pageData.top_rated ?
                    [...pageData.top_rated.results].splice(0, 3).map(movie => {
                      return <div key={movie.id}>
                        <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt="pic" />
                      </div>
                    })
                    : null
                  }
                </div>
                <div>
                  <span><ListWhiteIcon /></span>
                  <span>The Best Movies and Shows in&nbsp;
                    {
                    [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ][new Date().getMonth()]
                  }
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </>:
        null
      }
    </section>
  );
}

export default Movie;