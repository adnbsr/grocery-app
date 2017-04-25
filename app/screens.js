import {Navigation} from 'react-native-navigation'

import Home from './ui/screens/Home'
import Register from './ui/screens/Register'
import Splash from './ui/screens/Splash'
import Cart from './ui/screens/Cart'

export function registerScreens(store, Provider) {
  Navigation.registerComponent('sepetim.Splash', () => Splash)
  Navigation.registerComponent('sepetim.Home', () => Home, store, Provider)
  Navigation.registerComponent('sepetim.Register', () => Register,store, Provider)
  Navigation.registerComponent('sepetim.Cart', () => Cart, store, Provider)
}
