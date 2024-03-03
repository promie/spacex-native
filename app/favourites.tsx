import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
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

  return (
    <View>
      {data &&
        data.map((item: any) => (
          <Text key={item.flight_number}>{item.mission_name}</Text>
        ))}
    </View>
  )
}
export default Page
