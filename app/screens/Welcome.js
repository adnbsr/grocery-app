/**
 * Created by adnanbasar on 02/05/2017.
 */

import React from 'react'
import {View, StyleSheet, Text, PushNotificationIOS, Platform} from 'react-native'
import PushNotification from 'react-native-push-notification'
import Button from '../components/Button'
import {COLOR_WHITE, MD_BLUE_GRAY_800, COLOR_PRIMARY} from '../utils/constants'
import {connect} from 'react-redux'
import {storeDeviceToken, updateInstallation} from '../actions'
import SplashIcon from '../components/SplashIcon'

class Welcome extends React.Component {


    static navigatorStyle = {
        navBarHidden: true,
        statusBarHidden: false,
        statusBarTextColorScheme: 'dark',
        statusBarColor: MD_BLUE_GRAY_800
    }

    componentDidMount() {

        const {dispatch} = this.props


        PushNotificationIOS.addEventListener('notification', (notification) => {
            console.log(notification)
        })

        PushNotification.configure({
            onRegister: (token) => {
                dispatch(storeDeviceToken(token))
            },
            onNotification: (notification) => {
                console.log(notification)
            },
            popInitialNotification: true,
            senderID: "gcm_id",
            requestPermissions: true,
            permissions: {
                alert: true,
                badge: true,
                sound: true
            }
        })

        if (Platform.OS === 'ios') {
            PushNotificationIOS.setApplicationIconBadgeNumber(2);
            updateInstallation({badge: 2});
        }
    }

    componentWillUnmount(){
        PushNotificationIOS.removeEventListener('register')
    }

    render() {
        return (
            <View style={styles.container}>

                <SplashIcon />
                <Text style={styles.slogan}>Turkmenistan Largest Online Supermarket</Text>
                <Button title="LOGIN" style={styles.button} onPress={() => this.onLogin()}/>
                <Button title="SIGN UP" style={styles.button} onPress={() => this.onSignup()}/>
            </View>
        )
    }

    onLogin() {
        this.props.navigator.showModal({
            screen: 'sepetim.Login',
            title: 'Login',
            animationType: 'slide-up'
        })
    }

    onSignup() {
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

export default connect()(Welcome)