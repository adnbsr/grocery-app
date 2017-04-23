import {Navigation} from 'react-native-navigation'

import Home from './ui/screens/Home'
import Register from './ui/screens/Register'

export function registerScreens() {
  Navigation.registerComponent('sepetim.Home', () => Home)
  Navigation.registerComponent('sepetim.Register', () => Register)
}
