import * as React from 'react'
import { ChakraProvider } from "@chakra-ui/react"
import './App.css';
import PokeDex from '../src/components/pokedex'

export default function App({ Component }) {

  return (
    <ChakraProvider>
      <PokeDex />
    </ChakraProvider>
  );
}
