import React from 'react'
import {Image, Dimensions} from 'react-native'

const width = Dimensions.get('window').width

const SplashIcon = () => {

  return (<Image source={{
    uri: "https://facebook.github.io/react/img/logo_og.png"
  }} style={{
    width: width / 2,
    height: width / 2,
    alignSelf: 'center'
  }}/>)

}

export default SplashIcon
