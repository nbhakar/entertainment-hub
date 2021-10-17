import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({
  genre,
  setGenre,
  selectedGenre,
  setSelectedGenre,
  type,
  setPage,
}) => {
  const addHandler = (gen) => {
    setSelectedGenre([...selectedGenre, gen]);
    setGenre(genre.filter((g) => g.id !== gen.id));
    setPage(1);
  }
    

    const fetchGenre = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setGenre(data.genres);
    };
    const removeHandler = (gen) => {
      setGenre([...genre, gen]);
      setSelectedGenre(selectedGenre.filter((g) => g.id !== gen.id));
      setPage(1);
    };
  useEffect(() => {
    fetchGenre();

    return () => {
      setGenre([]);
    };
    
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenre &&
        selectedGenre.map((g) => (
          <Chip
            label={g.name}
            size="small"
            key={g.id}
            color="secondary"
            style={{ margin: 2 }}
            clickable
            onDelete={() => removeHandler(g)}
          />
        ))}
      {genre &&
        genre.map((g) => (
          <Chip
            label={g.name}
            size="small"
            key={g.id}
            color="primary"
            style={{ margin: 2 }}
            clickable
            onClick={() => addHandler(g)}
          />
        ))}
    </div>
  );
};

export default Genres;
