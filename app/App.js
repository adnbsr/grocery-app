import React from 'react'
import {Navigation} from 'react-native-navigation'
import {Provider} from 'react-redux'
import appReducer from './reducers'
import {configureStore} from './store'
import {registerScreens} from './registerScreens'
import {IconsLoaded} from './utils/icons'
import {COLOR_PRIMARY, COLOR_WHITE, APPLICATION_ID, SERVER_URL, MASTER_KEY} from './utils/constants'
import Parse from 'parse/react-native'

const store = configureStore(appReducer)
registerScreens(store, Provider)

console.log(store.getState())
console.disableYellowBox = true;

const navigatorStyle = {
    statusBarColor: COLOR_PRIMARY,
    navBarBackgroundColor: COLOR_PRIMARY,
    navBarTextColor: COLOR_WHITE,
    navBarButtonColor: COLOR_WHITE,
    navBarNoBorder: true,
    topBarElevationShadowEnabled: false,
    navBarTitleTextCentered: false
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
                left: {
                    screen: 'sepetim.Drawer'
                }
            }
        })

        Parse.initialize(APPLICATION_ID, MASTER_KEY)
        Parse.serverURL = SERVER_URL
    })
}

export default App
