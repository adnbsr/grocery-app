// @flow

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Parse from 'parse/react-native'

class CartListItem extends React.Component {

  props: {
    title: string
  }

  static propTypes = {
    title: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      margin: 4,
      marginLeft: 6,
      borderRadius: 4,
      backgroundColor: '#EEEEEE',
      height: 56,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    title: {
      fontSize: 14,
      textAlign: 'center'
    }
})

export default CartListItem
