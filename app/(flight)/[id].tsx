import React from 'react'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getFlightDetails } from '@api/launches'
import LoadingIndicator from '@components/LoadingIndicator'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const flightDetailsQuery = useQuery({
    queryKey: ['flightDetails', id],
    queryFn: () => getFlightDetails(id!),
  })

  const { isLoading, data } = flightDetailsQuery

  return (
    <View>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Text>Flight page for number: {id}</Text>
      )}
    </View>
  )
}

export default Page
