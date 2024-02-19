import React from 'react'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View>
      <Text>Flight page for number: {id}</Text>
    </View>
  )
}
export default Page
