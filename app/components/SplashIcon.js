import React from 'react'
import {Image, Dimensions, StyleSheet} from 'react-native'

const width = Dimensions.get('window').width

class SplashIcon extends React.Component {

    render() {
        return <Image source={require('../img/logo.png')} style={styles.icon}/>
    }
}

const styles = StyleSheet.create({
    icon: {
        width: width / 2,
        height: width / 2,
        alignSelf: 'center'
    }
})

export default SplashIcon
