import React, { useState, useEffect } from 'react'
import { Flex, Heading, Input, useToast, GridItem, Button, Image, useColorMode, useColorModeValue, extendTheme } from '@chakra-ui/react'
import * as PokemonActions from '../actions/pokemonSearch.actions';
import '../App.css';
import QuestionMark from '../assets/question-mark.png';
import { DeleteIcon } from '@chakra-ui/icons'
import PokemonCard from './pokemonCard';

const PokeDex = () => {

    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState([]);
    const [myTeam, setMyTeam] = useState(JSON.parse(localStorage.getItem('my-team')) || []);
    const [pokemonCardName, setPokemonCardName] = useState('');
    const [pokemonID, setPokemonID] = useState('');
    const [pokemonXp, setPokemonXp] = useState('');
    const [pokemonHeight, setPokemonHeight] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonImage, setPokemonImage] = useState('');
    const [pokemonType, setPokemonType] = useState('');
    const toast = useToast()

    const handlePokemonName = (event) => {
        setPokemonName(event.target.value);
    }

    //api call for pokemon & sets all variable for pokemon data
    const searchPokemon = async (name) => {
        const result = await PokemonActions.getPokemonInfo(name.toLowerCase());

        if (result !== undefined) {
            setPokemonData(result);
            setPokemonCardName(result[3]);
            setPokemonID(result[1]);
            setPokemonXp(result[0]);
            setPokemonHeight(result[2]);
            setPokemonWeight(result[4]);
            setPokemonImage(result[5]);
            setPokemonType(result[6]);
        } else {
            toast({
                position: 'top-right',
                title: "Error",
                description: `${pokemonName} does not exist`,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }
    }

    //sets data for pokemon card when pokemon is clicked from 'My Team'
    const myTeamClicked = (event) => {
        setPokemonData(myTeam[event]);
        setPokemonCardName(myTeam[event][3]);
        setPokemonID(myTeam[event][1]);
        setPokemonXp(myTeam[event][0]);
        setPokemonHeight(myTeam[event][2]);
        setPokemonWeight(myTeam[event][4]);
        setPokemonImage(myTeam[event][5]);
        setPokemonType(myTeam[event][6]);
    }

    //logic for add pokemon to team
    const addPokemon = () => {
        //checks if pokemon exists in team
        var bool = false;
        for (var i = 0; i < myTeam.length; i++) {
            if (myTeam[i][3] === pokemonData[3]) {
                bool = true;
            }
        }

        //logic for size of team & pre-existing pokemon check
        if (myTeam.length !== 6) {
            if (bool === false) { //if pokemon does not exist in team... add to team
                setMyTeam(myTeam => [...myTeam, pokemonData]);
                localStorage.setItem('my-team', JSON.stringify([...myTeam, pokemonData])); //localstorage to save team
            } else {
                toast({
                    position: 'top-right',
                    title: "Error",
                    description: `${pokemonCardName} is already in your team!`,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                })
            }
        } else {
            toast({
                position: 'top-right',
                title: "Error",
                description: "Your PokeMon team is full!",
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }
    }

    //delete pokemon from team
    const deletePokemon = (index) => {
        var array = [...myTeam];
        toast({
            position: "top-right",
            title: "Success",
            description: `Removing ${myTeam[index][3]} from your team.`,
            status: "success",
            duration: 4000,
            isClosable: true,
        })
        array.splice(index, 1);
        localStorage.setItem('my-team', JSON.stringify(array)); //local storage to delete pokemon from team
        setMyTeam(array);
    }

    return (
        <div className='container' height='100vh'>
            <Flex className='pokedex-container' p={4}>
                <GridItem bg='red.500' className='inner-pokedex' p={3}>
                    <Input onChange={handlePokemonName} w='200px' className='search' placeholder="Pikachu" variant='filled' mb={3} />
                    <Button onClick={() => searchPokemon(pokemonName)} colorScheme='green'>Search</Button>
                    <div>
                        {
                            pokemonData.length > 0 && pokemonData !== undefined ?
                                <div>
                                    <PokemonCard name={pokemonCardName} id={pokemonID} xp={pokemonXp} height={pokemonHeight} weight={pokemonWeight} image={pokemonImage} type={pokemonType} />
                                    <Button onClick={addPokemon} className='add-btn' colorScheme='green'>Add to My Team</Button>
                                </div>
                                : pokemonData !== undefined ? <div>
                                    <PokemonCard name={pokemonCardName} id={pokemonID} xp={pokemonXp} height={pokemonHeight} weight={pokemonWeight} image={QuestionMark} type={pokemonType} />
                                    <Button onClick={addPokemon} disabled className='add-btn' colorScheme='green'>Add to My Team</Button>
                                </div> : <Heading></Heading>
                        }
                    </div>
                </GridItem>
            </Flex>
            <Flex className='pokemon-team' alignItems='center' justifyContent='center' p={8}>
                <div className='inner-team'>
                    <Heading>Your Team</Heading>
                    {myTeam.map((row, idx) => {
                        return (
                            <div className='my-pokemon' key={row} onClick={() => myTeamClicked(idx)}>
                                <DeleteIcon color='gray.100' className='delete-icon' onClick={() => deletePokemon(idx)} />
                                <Image h='100%' w='100%' borderRadius="md" src={row[5]} />
                            </div>
                        );
                    })}
                </div>
            </Flex>
        </div >
    )
}

export default PokeDex
