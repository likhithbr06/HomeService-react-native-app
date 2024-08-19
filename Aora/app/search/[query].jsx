import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native'

const Search = () => {
  const {query} = useLocalSearchParams()
  return (
    <SafeAreaView className="bg-primary h-full"> 
      <Text className="text-2xl text-white">{query}</Text>
    </SafeAreaView>
  )
}

export default Search