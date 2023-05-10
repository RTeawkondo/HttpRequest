import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState(null);
  async function fecthHandler() {
    setLoad(true);
    setErr(null);
    try {
      const res = await fetch("https://swapi.dev/api/films/");
      if (!res.ok) {
        throw new Error("Some thing went wrong");
      }
      const data = await res.json();
      const movie = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          openingText: item.opening_crawl,
          releaseDate: item.release_date,
        };
      });
      setState(movie);
    } catch (error) {
      setErr(error.message);
    }
    setLoad(false);
  }
  let content;
  if (loading) {
    content = <p>loading........!</p>;
  }
  if (err) {
    content = <p>{err}</p>;
  }
  if (!loading && !err) {
    content = <p>No movie founded</p>;
    if (state.length > 0) {
      content = <MoviesList movies={state} />;
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fecthHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
