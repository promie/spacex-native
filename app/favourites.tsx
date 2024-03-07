import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQueries } from '@tanstack/react-query'
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

  console.log('data', data)

  return (
    <ScrollView>
      {data &&
        data.map((item: any, index: number) => (
          <View key={index}>
            <Image
              source={{ uri: data?.links?.mission_patch_small }}
              style={styles.preview}
            />
            <Text key={index}>{item.mission_name}</Text>
          </View>
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  preview: {
    width: 100,
    height: 100,
  },
})
export default Page
