import React, { useEffect, useState } from "react";
import Pokemon from "./Classes/PokemonStats";

import PokemonCards from "./components/PokemonCard";
import "./App.css";
// import PokemonInfoCards from "./components/PokemonInfoCards";

function App() {
  const [pokemonsArray, setPokemonsArray] = useState([]);
  const [pokemonsStarter, setPokemonsStarter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tabPokemon = [];
      const starter = [];
      const idStarter = [1, 4, 7];

      for (let i = 1; i <= 31; i += 1) {
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
      setPokemonsStarter(starter);
    };
    fetchData();
  }, []);

  return (
    <div>
      {console.info(pokemonsStarter)}
      <h1>
        Choose your <br /> starter
      </h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {pokemonsStarter.map((pokemon) => (
          <PokemonCards pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </div>
  );
}

export default App;
