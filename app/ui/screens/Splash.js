import React from 'react'
import {View, StyleSheet} from 'react-native'
import {MD_RED_500} from '../../utils/constants'
import SplashIcon from '../components/SplashIcon'

export default class Splash extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <SplashIcon />
      </View>
    );
  }

  componentDidMount() {
      setTimeout(() => {
        this.props.navigator.push({
          screen: 'sepetim.Home',
          title: 'Home'
        })
      },2000)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MD_RED_500,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
