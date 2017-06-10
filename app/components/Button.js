/**
 * Created by adnanbasar on 02/05/2017.
 */

import React from 'react'
import {Text, StyleSheet} from 'react-native'
import {MD_BLUE_GRAY_800, COLOR_WHITE} from '../utils/colors'
import Touchable from './Touchable'

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

    render() {

        const buttonStyles = [styles.button]

        if (this.props.style) {
            buttonStyles.push(this.props.style)
        }

        return (
            <Touchable onPress={this.props.onPress} style={buttonStyles}>
                <Text style={styles.text}>{this.props.title}</Text>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: MD_BLUE_GRAY_800,
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'center',
        paddingLeft: 4,
        paddingRight: 4
    },
    text: {
        color: COLOR_WHITE,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center'
    }
})

export default Button