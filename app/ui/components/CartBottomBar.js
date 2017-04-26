// @flow

import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight, TouchableNativeFeedback, Platform} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class CartBottomBar extends React.Component {

  props : {
    goToCart: () => any
  }

  static propTypes = {
    goToCart : React.PropTypes.func.isRequired
  }

  render() {

    const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback

    return (
      <View style={styles.container}>
      <View style={styles.informationBar}>
        <Text style={styles.informationText}>
        STANDART: Tomorrow 5:00 PM to 19:30 PM
        </Text>
        <Text style={styles.informationText}>
        EXPRESS: By Tomorrow 8:30 AM
        </Text>
      </View>
      <Touchable style={styles.cartIconBar} onPress={this.props.goToCart}>
        <MaterialIcon name="shopping" color="#FFFFFF" size={24} />
      </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  informationBar: {
    flex: 4,
    flexDirection: 'column',
    backgroundColor: '#424242',
    justifyContent: 'center',
    padding: 8
  },
  cartIconBar: {
    flex: 1,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center'
  },
  informationText: {
    color: 'white'
  }

})

export default CartBottomBar
