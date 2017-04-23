import React, {Component} from 'react'
import {View, Text, StyleSheet, AsyncStorage, ListView, Button} from 'react-native'

export default class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
        name : "Adnan"
    }
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{this.state.name}</Text>
        <Button title="BAS" onPress={ () => {

          this.props.navigator.showModal({
        			screen: 'sepetim.Register',
              title: "Register",
        			backButtonHidden: true
        		});


        }}/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: '200'
  },
  surname: {
    fontWeight: 'bold'
  }
})
