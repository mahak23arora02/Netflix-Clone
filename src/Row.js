//rfce shortcut for function
import React, { useState , useEffect } from 'react'
import axios from './axios';
import './Row.css' ;
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const base_url= "https://image.tmdb.org/t/p/original/"

function Row({title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl]= useState([]);

    // A snippet of code which runs on a specific condition/ variable
    useEffect(()=>{   
        //if [](is empty array), run once when the row loads and dont run again.
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            //"https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&witg_network=213"
            //console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);
    console.table(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) =>{
        if(trailerUrl) { //if video is already opened, then we will hide the video if clicked again!!
            setTrailerUrl(''); 
        }else{
            movieTrailer(movie?.name || "")
            .then(url =>{
                // https://www.youtube.com/watch?v=7Ledk_j5o1w (mainly part after ? in url)
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {/*several row_poster */}
                {movies.map(movie => (
                    <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    />
                ) )}
            </div>
            {/* container -> posters  */}
           
            {/* pop youtube trailer below the row */}
            {trailerUrl && <YouTube videoId ={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row;
