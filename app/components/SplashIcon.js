import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {SCREEN_WIDTH} from '../utils'

class SplashIcon extends React.Component {

    render() {
        return <Image source={require('../img/logo.png')} style={styles.icon}/>
    }
}

const styles = StyleSheet.create({
    icon: {
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 2,
        alignSelf: 'center'
    }
})

export default SplashIcon
