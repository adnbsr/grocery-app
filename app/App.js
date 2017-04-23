import React from 'react'
import {Navigation} from 'react-native-navigation'

import {registerScreens} from './screens'

registerScreens()


Navigation.startSingleScreenApp({
  screen : {
    screen : 'sepetim.Home',
    title : 'Home'
  }
})
