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
import { Ionicons } from '@expo/vector-icons'
import { getLaunches } from '@api/launches'

const Page = () => {
  const query = useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
  })

  const { data, isLoading } = query

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link key={index} href={`/(launch)/${item.flight_number}`} asChild>
      <TouchableOpacity>
        <View style={styles.item}>
          <Image
            source={{ uri: item.links.patch.small }}
            style={styles.preview}
          />
          <Text style={styles.itemText}>{item.name}</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator style={styles.loadingIndication} />}
      <FlashList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View />}
        estimatedItemSize={100}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndication: {
    marginTop: 15,
  },
  item: {
    padding: 10,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    textTransform: 'capitalize',
    flex: 1,
  },
  preview: {
    width: 100,
    height: 100,
  },
})

export default Page
