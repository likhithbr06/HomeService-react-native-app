import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'
import CustomButton from './CustomButton'
import { router, usePathname } from 'expo-router'


const SearchInput = () => {
    const pathname = usePathname()
    const [Query, setQuery] = useState('')
  return (
    
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary  items-center flex-row space-x-4">
            <TextInput 
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={Query}
            placeholder="Search for a video topic.."
            placeholderTextColor="#CDCDE0"
            onChangeText={(e)=> setQuery(e)}
            
            />
           <TouchableOpacity
           onPress={()=>{
            if(!Query){
              return Alert.alert('Missing Query','Please input something to search.')
            }
            if(pathname.startsWith('/search')) 
              router.setParams({Query})
            else
              router.push(`/search/${Query}`)
           }}>
            <Image source={icons.search} className="w-5 h-5" resizeMode='contain'/>
           </TouchableOpacity>
           
      </View>
  )
}

export default SearchInput;