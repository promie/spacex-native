import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
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
        <>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: data.links.mission_patch }}
                style={styles.patchLogo}
              />
              <Text style={styles.title}>{data.mission_name}</Text>
            </View>

            <View>
              <Text>{data.details}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  patchLogo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 25,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#245086',
  },
})

export default Page
