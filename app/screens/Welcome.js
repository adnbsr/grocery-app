/**
 * Created by adnanbasar on 02/05/2017.
 */

import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Button from '../components/Button'
import {COLOR_WHITE, MD_BLUE_GRAY_800, COLOR_PRIMARY} from '../utils/constants'
import SplashIcon from '../components/SplashIcon'

class Welcome extends React.Component {


    static navigatorStyle = {
        navBarHidden: true,
        statusBarHidden: false,
        statusBarTextColorScheme: 'dark',
        statusBarColor: MD_BLUE_GRAY_800
    }

    render() {
        return (
            <View style={styles.container}>

                <SplashIcon />
                <Text style={styles.slogan}>Turkmenistan Largest Online Supermarket</Text>
                <Button title="LOGIN" style={styles.button} onPress={() => this.onLogin()} />
                <Button title="SIGN UP" style={styles.button} onPress={() => this.onSignup()}/>
            </View>
        )
    }

    onLogin(){
        this.props.navigator.showModal({
            screen: 'sepetim.Login',
            title: 'Login',
            animationType: 'slide-up'
        })
    }

    onSignup(){
        this.props.navigator.showModal({
            screen: 'sepetim.Signup',
            title: 'Sign Up',
            animationType: 'slide-up'
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLOR_WHITE,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    slogan: {
        textAlign: 'center',
        color: COLOR_PRIMARY,
        fontSize: 18,
        padding: 8,
        margin: 24
    },
    button: {
        height: 48,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: MD_BLUE_GRAY_800
    }
})

export default Welcome