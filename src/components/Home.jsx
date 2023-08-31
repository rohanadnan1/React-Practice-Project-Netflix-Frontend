import React from 'react'
import "../styles/Home.scss"
import axios from 'axios'
import Cover from './Cover'
import { Link } from 'react-router-dom'

const apiKey = "d8843489cf74600a23c83ced09302c25" 
const url = "https://api.themoviedb.org/3"
const imgUrl = " https://image.tmdb.org/t/p/original"

const Row = ({title, arr = []}) => {

    
  return (
    <div className='row-container'>
        <h2>{title}</h2>
    <div className="cover-container">
      {arr.map((item, index) => {
        return <Cover key={index} img={`${imgUrl}/${item.poster_path}`} />
      })}
    </div>
    </div>
  )
}



const Home = () => {


  
   

    const [upcomingMovie, setUpcomingMovie] = React.useState([])
    const [nowPlayingMovie, setNowPlayingMovie] = React.useState([])
    const [topRatedMovie, setTopRatedMovie] = React.useState([])
    const [popularMovie, setPopularMovie] = React.useState([])
    const [genre, setGenre] = React.useState([])
    const [tvshow, setTvShow] = React.useState([])

    React.useEffect(() => {

        const fetchUpcoming = async () => {
            const {data} = await axios.get(`${url}/movie/upcoming?api_key=${apiKey}`)
            setUpcomingMovie(data.results)
            console.log(upcomingMovie)
        }

        const fetchNowPlaying = async () => {
            const {data} = await axios.get(`${url}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
            setNowPlayingMovie(data.results)
            console.log(upcomingMovie)
        }


        const fetchTopRated = async () => {
            const {data} = await axios.get(`${url}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
            setTopRatedMovie(data.results)
            console.log(upcomingMovie)
        }

        const fetchPopular = async () => {
            const {data} = await axios.get(`${url}/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            setPopularMovie(data.results)
            console.log(upcomingMovie)
        }

        const getGenre = async () => {
            const {data} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}&language=en-US&page=1`)
            setGenre(data.genres)
            console.log(upcomingMovie)
        }

        const tvShows = async () => {
            const {data} = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=4`)
            setTvShow(data.results)
            console.log(upcomingMovie)
        }

        tvShows()
        getGenre()
        fetchPopular()
        fetchNowPlaying()
        fetchTopRated()
        fetchUpcoming()
    }, [])


  return (
    <section className="home">
        <div className="banner" style={{
            backgroundImage: nowPlayingMovie[6]? `url(${imgUrl}/${nowPlayingMovie[6].backdrop_path})` : ''
        }}></div>

        <div className='elements-container'>
            <Row title={"Upcoming Movies"} arr={upcomingMovie}/>
        </div>

        <div className='elements-container'>
            <Row title={"Now Playing"} arr={nowPlayingMovie}/>
        </div>

        <div className='elements-container'>
            <Row title={"Top Rated"} arr={topRatedMovie}/>
        </div>

        <div className='elements-container'>
            <Row title={"Popular"} arr={popularMovie}/>
        </div>

        <div className='elements-container'>
            <Row title={"Tv Shows"} arr={tvshow}/>
        </div>

        <div className="genreBox">
            {
                genre.map((item) => {
                    return <Link key={item.id} to={`/genre/${item.id}`} >{item.name}</Link>
                })
            }
        </div>
        
    </section>
  )
}

export default Home