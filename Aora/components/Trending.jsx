import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({posts}) => {
  return (
    <View>
      <FlatList
      data={posts}
      keyExtractor={(item)=>item.id}
      renderItem={({item})=>(
        <Text className="text-white">{item.id}</Text>
      )}
      horizontal> 

      </FlatList>

    </View>
  )
}

export default Trending