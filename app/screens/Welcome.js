/**
 * Created by adnanbasar on 02/05/2017.
 *
 * @flow
 */

import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Button from '../components/Button'
import {COLOR_WHITE, MD_BLUE_GRAY_800, COLOR_PRIMARY} from '../utils/colors'
import {connect} from 'react-redux'
import {skipLogin} from '../actions'
import SplashIcon from '../components/SplashIcon'
import strings from '../utils/strings'
import Touchable from "../components/Touchable";

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
                <Text style={styles.slogan}>{strings.welcomeSlogan}</Text>
                <Button title={strings.loginUppercase} style={styles.button} onPress={() => this.onLogin()}/>
                <Button title={strings.signupUppercase} style={styles.button} onPress={() => this.onSignup()}/>
                <Touchable onPress={() => {
                    this.props.dispatch(skipLogin())
                }} >
                    <Text style={styles.skip}>(Skip)</Text>
                </Touchable>
            </View>
        )
    }

    onLogin() {
        this.props.navigator.showModal({
            screen: 'sepetim.Login',
            title: strings.login,
            animationType: 'slide-up'
        })
    }

    onSignup() {
        this.props.navigator.showModal({
            screen: 'sepetim.Signup',
            title: strings.signup,
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
    },
    skip: {
        textAlign: 'center',
        color: 'red',
        fontSize: 18,
        padding: 8,
    }
})

export default connect()(Welcome)