/**
 * Created by adnanbasar on 30/04/2017.
 *
 * @flow
 */


import React from 'react'
import {View, StyleSheet} from 'react-native'
import SplashIcon from '../components/SplashIcon'
import {IconsLoaded, IconsMap} from '../utils/icons'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/constants'

class Notifications extends React.Component {

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY,
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE
    }

    render() {
        return (
            <View style={styles.container}>
                <SplashIcon />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Notifications
