import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
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
  )
}

export default Layout
