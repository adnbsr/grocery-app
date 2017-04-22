import React, {Component} from 'react'
import {View, Text, StyleSheet, AsyncStorage} from 'react-native'

import Register from './components/register'
import ErrorScreen from './components/errorScreen'
import Constants from './utils/constants'

export default class App extends Component {

  state = {
    isUserLoggedIn: false
  }

  componentWillMount() {
    this._checkUserLogin()
  }

  _checkUserLogin = async() => {
    try {
      await AsyncStorage.getItem(Constants.userLoggedInKey(), (error, value) => {

        if (value !== null) {
          if (value === "false") {
            this.setState({isUserLoggedIn: false})
          } else {
            this.setState({isUserLoggedIn: true})
          }
        }

      })
    } catch (e) {} finally {
      console.log(`isUserLoggedIn : ${this.state.isUserLoggedIn}`);
    }
  }

  render() {

    if (this.state.isUserLoggedIn) {
      return (
        <View style={styles.container}>
          <Text>App</Text>
        </View>
      )
    }

    return (<Register/>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
