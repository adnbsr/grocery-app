// @flow

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Parse from 'parse/react-native'

class CartListItem extends React.Component {

  props: {
    title: string,
    id: string
  }

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.string
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>

        <Text style={styles.title}>
          {this.props.id}
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
      flexDirection: 'column',
      justifyContent: 'center'
    },
    title: {
      fontSize: 14,
      textAlign: 'center'
    }
})

export default CartListItem
