import React from 'react'
import {Navigation} from 'react-native-navigation'
import {View, Text} from 'react-native'
import {Provider} from 'react-redux'
import {configureStore} from './store'
import {registerScreens} from './registerScreens'
import {checkCurrentUser, getCurrentInstallation} from './actions'
import {IconsLoaded} from './utils/icons'
import {COLOR_PRIMARY, COLOR_WHITE} from './utils/colors'
import {APPLICATION_ID, SERVER_URL, MASTER_KEY, JAVASCRIPT_KEY} from './utils/constants'
import strings from './utils/strings'
import Parse from 'parse/react-native'


function observeStore(store, select, onChange) {
    let currentState;

    function handleChange() {
        let nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}

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

function startApp() {
    IconsLoaded.then(() => {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'sepetim.Home',
                title:  strings.appName,
                navigatorStyle
            },
            drawer: {
                left: {
                    screen: 'sepetim.Drawer'
                }
            }
        })
    })
}

function startWelcome() {
    IconsLoaded.then(() => {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'sepetim.Welcome',
                title: strings.welcome,
                navigatorStyle
            }
        })
    })
}

const App = () => {

    Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY, MASTER_KEY)
    Parse.serverURL = SERVER_URL

    const store = configureStore()

    registerScreens(store, Provider)

    store.dispatch(checkCurrentUser())

    observeStore(store, (store) => {
            const {user} = store
            return user
        },
        (user) => {

            if (user.isUserLoggedIn || user.isLoginSkipped) {
                startApp()
            } else {
                startWelcome()
            }
        })
}

export default App
