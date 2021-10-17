import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/singleContent/SingleContent";
import useGenre from "../../hooks/useGenre";

function Movies() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const genreForURL = useGenre(selectedGenre);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreForURL}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchMovies();
  }, [page,genreForURL]);

  return (
    <div>
      <h1 className="pageTitle">Movies</h1>
        <Genres
          type="movie"
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genre={genre}
          setGenre={setGenre}
          setPage={setPage}
        />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages>1 && <CustomPagination  setPage={setPage} noOfPages={numOfPages} />}
    </div>
  );
}

export default Movies;
