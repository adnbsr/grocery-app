// @flow

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

class SearchBarHolder extends React.Component {

  props : {
    goToSearchView: () => any
  }

  static propTypes = {
    goToSearchView: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.barContainer}>
        <MaterialIcon.Button name="search" color="#BDBDBD" backgroundColor="#ffffff" borderRadius={18} onPress={this.props.goToSearchView}>
          Search Products
        </MaterialIcon.Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: '#F44336',
    justifyContent: 'center'
  },
  barContainer: {
    height: 36,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 18,
    backgroundColor: 'white'
  }
})

export default SearchBarHolder
