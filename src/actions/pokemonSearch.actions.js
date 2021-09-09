import axios from 'axios';

/*
* gets the following information:
* pokemon base experience, ID, name, height, weight, image URL, 
*/
export const getPokemonInfo = async (pokemonName) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        return [response.data.base_experience, response.data.id, response.data.height, response.data.name, response.data.weight, response.data.sprites.front_default, response.data.types[0].type.name];
    } catch(err) {
        console.log(err);
    }
}