import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class CartToolbar extends React.Component {

  props: {
    cartSize: string
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sepettekiler
        </Text>
        <FontAwesome.Button style={styles.size} name="shopping-basket" backgroundColor="#F44336">
          <Text style={{
            color: 'white'
          }}>{this.props.cartSize}</Text>
        </FontAwesome.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F44336',
    height: 64,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    flex: 6,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  size: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default CartToolbar
