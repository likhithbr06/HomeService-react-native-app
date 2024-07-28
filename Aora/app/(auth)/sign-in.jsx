import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

const signin = () => {
  return (
    <SafeAreaView className='h-full bg-primary'>
        <ScrollView>
          <View className='w-full justify-center h-fullpx-4 my-6'>
              <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
              <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Login to Aora</Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default signin