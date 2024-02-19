import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { getLaunches } from '@api/launches'

const Page = () => {
  const query = useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
  })

  const { data, isLoading } = query

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link key={index} href={`/(launch)/${item.id}`} asChild>
      <TouchableOpacity></TouchableOpacity>
    </Link>
  )

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator style={styles.loadingIndication} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndication: {
    minHeight: '100%',
  },
})

export default Page
