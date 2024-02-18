import React from 'react'
import { View, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getLaunches } from '@api/launches'

const Page = () => {
  const query = useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
  })

  const { data, isLoading } = query

  console.log('isLoading', isLoading)
  console.log('data', data)

  return (
    <View>
      <Text>Welcome to SpaceX</Text>
    </View>
  )
}
export default Page
