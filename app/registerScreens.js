// @flow

import {Navigation} from 'react-native-navigation'

import Home from './screens/Home'
import Register from './screens/Register'
import Splash from './screens/Splash'
import Cart from './screens/Cart'
import Search from './screens/Search'
import Drawer from './screens/Drawer'
import ProductDetail from './screens/ProductDetail'
import Account from './screens/Account'
import Notifications from './screens/Notifications'
import {Provider} from 'react-redux'
import {Store} from  'redux'

export function registerScreens(store: Store, provider: Provider) {
    Navigation.registerComponent('sepetim.Splash', () => Splash)
    Navigation.registerComponent('sepetim.Home', () => Home, store, provider)
    Navigation.registerComponent('sepetim.Register', () => Register, store, provider)
    Navigation.registerComponent('sepetim.Cart', () => Cart, store, provider)
    Navigation.registerComponent('sepetim.ProductDetail', () => ProductDetail)
    Navigation.registerComponent('sepetim.Search', () => Search, store, provider)
    Navigation.registerComponent('sepetim.Drawer', () => Drawer, store, provider)
    Navigation.registerComponent('sepetim.Account', () => Account, store, provider)
    Navigation.registerComponent('sepetim.Notifications', () => Notifications, store, provider)
}
