import React, {Component} from 'react'
import {View, Text, StyleSheet, AsyncStorage, ListView} from 'react-native'

import Register from './ui/register'
import ErrorScreen from './ui/errorScreen'
import Constants from './utils/constants'
import Product from './ui/components/Product'

export default class Home extends Component {

  constructor(props) {
      super(props)

      this.state = {
        isUserLoggedIn: false
      }
  }

  componentWillMount() {
    this._checkUserLogin()
    this._fetchProducts()
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

  _fetchProducts(){

    var items = ["Product 1", "Product 2", "Product 3"]
    const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    const dataSource = ds.cloneWithRows(items)
    this.setState({
      dataSource
    })

  }

  render() {

    if (this.state.isUserLoggedIn) {
      return (
        <View style={styles.container}>
          <Product title="Ulker Cikolatali Gofret" />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => <Product title={rowData}/>}
            />
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
