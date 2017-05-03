/**
 * Created by adnanbasar on 02/05/2017.
 */

import React from 'react'
import {View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native'
import {MD_BLUE_GRAY_800, COLOR_WHITE} from '../utils/constants'

class Button extends React.Component {

    props: {
        title: string,
        style: any,
        onPress: () => any
    }

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func.isRequired
    }

    render(){

        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback: TouchableOpacity

        const buttonStyles = [styles.button]

        if (this.props.style){
            buttonStyles.push(this.props.style)
        }

            return (
            <Touchable onPress={this.props.onPress}>
                <View style={buttonStyles}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: MD_BLUE_GRAY_800,
        borderRadius: 4,
        overflow: 'hidden'
    },
    text: {
        color: COLOR_WHITE,
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default Button