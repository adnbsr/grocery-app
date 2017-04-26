// @flow

import React from 'react'
import {View, StyleSheet} from 'react-native'
import {MD_RED_500} from '../../utils/constants'
import SplashIcon from '../components/SplashIcon'

class Search extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <SplashIcon />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
