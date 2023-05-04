import React, { useEffect, useState } from "react";
import Pokemon from "./Classes/Pokemon";

// import PokemonGuesser from "./components/PokemonGuesser";
// import GameOver from "./components/GameOver";
import "./App.scss";
import Pokedex from "./components/Pokedex";

function App() {
  const [pokemonsArray, setPokemonsArray] = useState([]);

  // const [pokemonWon, setPokemonWon] = useState([]);
  // const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const tabPokemon = [];
      const starter = [];
      const idStarter = [1, 4, 7];

      for (let i = 1; i <= 200; i += 1) {
        tabPokemon.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }
      const responses = await Promise.all(tabPokemon.map((url) => fetch(url)));
      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      const pokemons = data.map((pokemon) => new Pokemon(pokemon));

      pokemons.forEach((pokemon) => {
        if (idStarter.includes(pokemon.id)) {
          starter.push(pokemon);
        }
      });

      setPokemonsArray(pokemons);
    };
    fetchData();
  }, []);

  // const handleClick = () => {
  //   setMode("guessPokemon");
  // };
  // console.info(pokemonWon);

  return (
    <div>
      {/* {mode === "path" && <Path handleClick={handleClick} />} */}

      {/* {mode === "guessPokemon" && (
        <PokemonGuesser
          setMode={setMode}
          pokemonsArray={pokemonsArray}
          setPokemonWon={setPokemonWon}
          mode={mode}
          setScore={setScore}
        />
      )}

      {mode === "gameOver" && (
        <GameOver pokemonWon={pokemonWon} setMode={setMode} score={score} />
      )}  */}

      <div className="App">
        <Pokedex pokemonsArray={pokemonsArray} />
      </div>
    </div>
  );
}

export default App;
