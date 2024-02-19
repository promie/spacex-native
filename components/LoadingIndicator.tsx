import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

const LoadingIndicator = () => {
  return <ActivityIndicator style={styles.loadingIndicator} />
}

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 15,
  },
})

export default LoadingIndicator
