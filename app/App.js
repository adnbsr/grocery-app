import React from 'react'
import {Navigation} from 'react-native-navigation'
import {Provider} from 'react-redux'
import appReducer from './reducers'
import {configureStore} from './store'
import {registerScreens} from './screens'
import {IconsLoaded} from './utils/icons'
import Parse from 'parse/react-native'

registerScreens(configureStore(appReducer), Provider)

const navigatorStyle = {
    statusBarColor: '#F44336',
    navBarBackgroundColor: '#F44336',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  navBarNoBorder: true

}

const App = () => {
  IconsLoaded.then(() => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'sepetim.Home',
        title: 'Sebetim',
        navigatorStyle
      },
      drawer: {
        right: {
          screen: 'sepetim.Cart'
        },
        left: {
          screen: 'sepetim.Drawer'
        }
      }
    })

    Parse.initialize('sepetim', 'masterKey')
    Parse.serverURL = 'http://192.81.223.195:8080/api'

  })
}

export default App
