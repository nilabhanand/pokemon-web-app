import React, { useState, useEffect } from 'react'
import { Heading, Center, Stack, Badge, Text, Box, Image } from '@chakra-ui/react'
import '../App.css';

const PokemonCard = ({ name, id, xp, height, weight, image, type }) => {

    return (
        <div>
            <Center py={4}>
                <Box
                    role={'group'}
                    p={6}
                    w={'full'}
                    className='background-card'>
                    <div className='pokemon-card'>
                        <Box
                            mt={-12}
                            pos={'relative'}
                            height={'230px'}
                        >
                            <Image
                                height={150}
                                width={150}
                                objectFit={'cover'}
                                src={image}
                                className='pokemon-img'
                            />
                        </Box>
                    </div>
                    <Stack pt={3} align={'center'}>
                        <Heading className='pokemon-name' fontSize={'3xl'}>
                            {name.toUpperCase()}
                        </Heading>
                        <Badge colorScheme="pink">{type}</Badge>
                        <div className='info-stack'>
                            <Stack className='stack' direction={'column'} align={'center'}>
                                <Text className='stack-text' fontSize={'m'}>
                                    ID#
                                </Text>
                                <Text className='stack-text'>
                                    {id}
                                </Text>
                            </Stack>
                            <Stack className='stack' direction={'column'} align={'center'}>
                                <Text className='stack-text' fontSize={'m'}>
                                    XP
                                </Text>
                                <Text className='stack-text'>
                                    {xp}
                                </Text>
                            </Stack>
                            <Stack className='stack' direction={'column'} align={'center'}>
                                <Text className='stack-text' fontSize={'m'}>
                                    Height
                                </Text>
                                <Text className='stack-text'>
                                    {height}
                                </Text>
                            </Stack>
                            <Stack className='stack' direction={'column'} align={'center'}>
                                <Text className='stack-text' fontSize={'m'}>
                                    Weight
                                </Text>
                                <Text className='stack-text'>
                                    {weight}
                                </Text>
                            </Stack>
                        </div>
                    </Stack>
                </Box>
            </Center>
        </div>
    )
}

export default PokemonCard