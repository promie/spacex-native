import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { format } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
import { Ionicons } from '@expo/vector-icons'
import { getFlightDetails } from '@api/launches'
import LoadingIndicator from '@components/LoadingIndicator'

const Page = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const { id } = useLocalSearchParams<{ id: string }>()

  const navigation = useNavigation()

  const flightDetailsQuery = useQuery({
    queryKey: ['flightDetails', id],
    queryFn: () => getFlightDetails(id!),
  })

  const { isLoading, data, isError } = flightDetailsQuery

  useEffect(() => {
    const checkFavourite = async () => {
      const favourite = await AsyncStorage.getItem(`favourite-${id}`)
      setIsFavourite(favourite === 'true')
    }

    checkFavourite()
  }, [])

  useEffect(() => {
    if (!isError && data) {
      const title = data.mission_name

      navigation.setOptions({
        title,
      })
    }
  }, [data, isError])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={toggleFavourite}>
          <Ionicons
            name={isFavourite ? 'star' : 'star-outline'}
            size={22}
            color="#FFF"
          />
        </Text>
      ),
    })
  }, [isFavourite])

  const toggleFavourite = async () => {
    await AsyncStorage.setItem(
      `favourite-${id}`,
      isFavourite ? 'false' : 'true',
    )
    setIsFavourite(!isFavourite)
  }

  console.log('data', data)

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

            {data?.details && (
              <View style={styles.detailsContiner}>
                <Text style={styles.detailsDescription}>{data.details}</Text>
              </View>
            )}

            <View style={styles.iconsContainer}>
              <View>
                <View style={styles.iconCenter}>
                  <Ionicons name={'airplane'} size={24} color="#245086" />
                </View>

                <View style={styles.spacer10}>
                  <Text style={styles.titleBold}>Launch Date</Text>
                  <Text>
                    {data?.launch_date_utc &&
                      format(data?.launch_date_utc, 'dd MMM yyyy')}
                  </Text>
                </View>
              </View>

              <View>
                <View style={styles.iconCenter}>
                  <Ionicons name={'home'} size={24} color="#245086" />
                </View>

                <View style={styles.spacer10}>
                  <Text style={styles.titleBold}>Launch Site</Text>
                  <Text>{data?.launch_site.site_name}</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  detailsContiner: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#c4b9b9',
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  iconCenter: {
    alignItems: 'center',
  },
  detailsDescription: {
    fontSize: 16,
  },
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
  spacer10: {
    marginTop: 10,
  },
  titleBold: {
    fontWeight: 'bold',
  },
})

export default Page
