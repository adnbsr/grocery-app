import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const CartListItem = ({title}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  )
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


// CartListItem.propTypes = {
//   title: React.PropTypes.string.isRequired
// }

export default CartListItem
