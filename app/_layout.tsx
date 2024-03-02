import React from 'react'
import { Stack, Link } from 'expo-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const queryClient = new QueryClient()

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#245086',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'SpaceX',
            headerRight: () => (
              <Link href={'/favourites'} asChild>
                <TouchableOpacity>
                  <Ionicons name="heart-circle" size={26} color="#FFF" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="favourites"
          options={{ title: 'Favourites', presentation: 'modal' }}
        />
      </Stack>
    </QueryClientProvider>
  )
}

export default Layout
