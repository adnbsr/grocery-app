import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Signup extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>
        Signup
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container : {
      flex: 1,
      flexDirection : 'row',
      alignItems: 'flex-end'
  }
})
