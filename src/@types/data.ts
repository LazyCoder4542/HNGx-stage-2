export interface MovieI {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean
  vote_average: number,
  vote_count: number
}

export type CastI = {
  adult: boolean,
  cast_id: number,
  character: string,
  credit_id: string,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  order: number,
  original_name: string,
  popularity: number,
  profile_path: string
}[]

export type CrewI = {
  adult: boolean,
  department: string,
  credit_id: string,
  gender: number,
  id: number,
  job: string,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string
}[]


export type DataI = {
  page: number,
  results: MovieI[],
  total_pages: number,
  total_results: number

}