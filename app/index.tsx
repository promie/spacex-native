import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { Ionicons } from '@expo/vector-icons'
import { getLaunches } from '@api/launches'
import Logo from '@components/Logo'
import LoadingIndicator from '@components/LoadingIndicator'

const Page = () => {
  const query = useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
  })

  const { data, isLoading } = query

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link key={index} href={`/(flight)/${item.flight_number}`} asChild>
      <TouchableOpacity>
        <View style={styles.item}>
          <Image
            source={{ uri: item.links.mission_patch_small }}
            style={styles.preview}
          />
          <Text style={styles.itemText}>{item.mission_name}</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <Logo />
          <FlashList
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            estimatedItemSize={100}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flex: 1,
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#DFDFDF',
  },
  preview: {
    width: 50,
    height: 50,
    maxWidth: 50,
    maxHeight: 50,
    marginRight: 20,
  },
  logo: {
    width: 300,
    height: 100,
  },
})

export default Page
