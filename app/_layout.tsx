import React from 'react'
import { Stack } from 'expo-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

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
        <Stack.Screen name="index" options={{ title: 'SpaceX ' }} />
      </Stack>
    </QueryClientProvider>
  )
}

export default Layout
