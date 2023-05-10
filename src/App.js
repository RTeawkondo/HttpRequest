import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const [loading,setLoad] = useState(false)
  async function fecthHandler() {
    setLoad(true)
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
    setLoad(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fecthHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && state.length > 0 && <MoviesList movies={state} />}
        {!loading && state.length === 0 && <p>No movie founded</p>}
        {loading && <p>loading........!</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
