import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQueries } from '@tanstack/react-query'
import { Ionicons } from '@expo/vector-icons'
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import { getFlightDetails } from '@api/launches'

const Page = () => {
  const [keys, setKeys] = useState<any[]>([])
  const [data, setData] = useState<any>([])

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const allKeys: any = await AsyncStorage.getAllKeys()

        setKeys(allKeys)
      } catch (e) {
        console.error('Error fetching keys from AsyncStorage:', e)
      }
    }

    fetchKeys()
  }, [])

  const flightDetailsQueries = useQueries({
    queries: keys.map((key: any) => {
      const flightIds = key.split('-')[1]
      return {
        queryKey: ['flightIds', flightIds],
        queryFn: () => getFlightDetails(flightIds),
      }
    }),
  })

  const allFinished = flightDetailsQueries.every(
    (query: any) => query.isSuccess,
  )

  useEffect(() => {
    if (allFinished) {
      const newData = flightDetailsQueries.map((query: any) => query.data)
      setData(newData)
    }
  }, [allFinished])

  const removeFavorite = async (id: number) => {
    await AsyncStorage.removeItem(`favourite-${id}`)
    setData(data.filter((item: any) => item.id !== id))
  }

  return (
    <GestureHandlerRootView>
      <ScrollView>
        {data &&
          data.map((item: any, index: number) => (
            <View key={index}>
              <Image
                source={{ uri: item?.links?.mission_patch_small }}
                style={styles.preview}
              />
              <Text key={index}>{item.mission_name}</Text>
              <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="trash" size={18} color="#c10505" />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  preview: {
    width: 100,
    height: 100,
  },
})
export default Page
