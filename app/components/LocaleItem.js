/**
 * Created by adnanbasar on 20/05/2017.
 *
 * @flow
 */

import React from 'react'
import {View, Text, Image, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native'

import type {LocaleType} from '../types'

class LocaleItem extends React.Component {

    props: {
        locale: LocaleType,
        onSelect: (locale) => any
    }

    render() {

        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

        return (
            <Touchable onPress={() => this.props.onSelect(this.props.locale)}>
                <View style={styles.container}>
                    <Image source={this.props.locale.icon} style={styles.icon}/>
                    <Text style={styles.label}>{this.props.locale.label}</Text>
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: 36,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        margin: 4,
    },
    icon: {
        width: 54,
        height: 36,
        marginRight: 8
    },
    label: {
        textAlign: 'center',
        alignSelf: 'center'
    }
})

export default LocaleItem