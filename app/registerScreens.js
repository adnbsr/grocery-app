// @flow

import {Navigation} from 'react-native-navigation'

import Welcome from './screens/Welcome'
import Signup from './screens/Signup'
import Login from './screens/Login'

import Home from './screens/Home'
import Drawer from './screens/Drawer'
import Cart from './screens/Cart'
import Search from './screens/Search'
import ProductDetail from './screens/ProductDetail'
import Account from './screens/Account'
import Notifications from './screens/Notifications'
import MapHelper from './screens/MapHelper'

import {Provider} from 'react-redux'
import {Store} from  'redux'

export function registerScreens(store: Store, provider: Provider) {
    Navigation.registerComponent('sepetim.Welcome', () => Welcome)
    Navigation.registerComponent('sepetim.Signup', () => Signup, store, provider)
    Navigation.registerComponent('sepetim.Login', () => Login, store, provider)

    Navigation.registerComponent('sepetim.Home', () => Home, store, provider)
    Navigation.registerComponent('sepetim.Cart', () => Cart, store, provider)
    Navigation.registerComponent('sepetim.ProductDetail', () => ProductDetail)
    Navigation.registerComponent('sepetim.Search', () => Search, store, provider)
    Navigation.registerComponent('sepetim.Drawer', () => Drawer, store, provider)
    Navigation.registerComponent('sepetim.Account', () => Account, store, provider)
    Navigation.registerComponent('sepetim.Notifications', () => Notifications, store, provider)
    Navigation.registerComponent('sepetim.MapHelper', () => MapHelper, store, provider)
}
