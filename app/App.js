import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Register from './components/register'

export default class App extends Component {

  render() {

    if (2>1) {
      return (
        <Register />
      )
    }

    return (
      <View style={styles.container}>
        <Text>App</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container : {
      flex: 1,
      justifyContent: 'center',
      alignItems : 'center'
  }
})
