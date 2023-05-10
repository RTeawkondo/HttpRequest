import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  async function fecthHandler() {
    const res = await fetch("https://swapi.dev/api/films/");
    const data = await  res.json();
    const movie = data.results.map((item) => {
      return {
        id: item.episode_id,
        title: item.title,
        openingText: item.opening_crawl,
        releaseDate: item.release_date,
      };
    });
    setState(movie);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fecthHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={state} />
      </section>
    </React.Fragment>
  );
}

export default App;
