const PokemonWrapper = () => {
  const pokemonList = [
    { src: "/assets/001.png", alt: "bulbasaur" },
    { src: "/assets/004.png", alt: "charmander" },
    { src: "/assets/007.png", alt: "squirtle" },
  ];
  return (
    <div className="img-wrapper">
      {pokemonList.map((pokemon, index) => {
        return (
          <img
            key={index}
            src={pokemon.src}
            alt={pokemon.alt}
            className="pokemon-png hidden"
          />
        );
      })}
    </div>
  );
};
export default PokemonWrapper;
