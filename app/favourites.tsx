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
    setData(data.filter((item: any) => item.flight_number !== id))
  }

  console.log('data', data)

  return (
    <GestureHandlerRootView>
      <ScrollView>
        {data &&
          data.map((item: any, index: number) => (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderWidth: 0.5,
                borderColor: '#c4b9b9',
                padding: 15,
              }}
            >
              <View
                style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
              >
                <Image
                  source={{ uri: item?.links?.mission_patch_small }}
                  style={styles.preview}
                />
              </View>

              <View
                style={{ flex: 2, display: 'flex', justifyContent: 'center' }}
              >
                <Text key={index} style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {item.mission_name}
                </Text>
              </View>

              <View style={{ display: 'flex', justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={() => removeFavorite(item.flight_number)}
                >
                  <Ionicons name="trash" size={18} color="#c10505" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  preview: {
    width: 40,
    height: 40,
  },
})
export default Page
