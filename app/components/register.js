import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'

export default class Regiter extends Component {

  render() {

    return (
      <View style={styles.container}>

        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <Text style={styles.logo}>Logo</Text>
        </View>

        <View style={{
          flex: 1,
          height: 100,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          alignSelf: 'flex-end'
        }}>
          <Text style={styles.signup}>Kayıt Ol</Text>
          <Text style={[styles.signup, styles.login]}>Giriş Yap</Text>
        </View>
      </View>
    )
  }

}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    textAlign: 'center',
    fontSize: 25,
  },
  signup: {
    height: 50,
    width: screenWidth,
    fontWeight: 'bold',
    padding: 8,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'red',
    alignSelf: 'stretch'
  },
  login: {
    color: 'black',
    backgroundColor: 'white'
  }
})
