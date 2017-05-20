import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import strings from '../utils/strings'

class CartToolbar extends React.Component {

    props: {
        cartSize: string,
        total: number
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`${this.props.cartSize} ${strings.items} - ${this.props.total} ${strings.currency}`}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_WHITE,
        height: 48,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        flex: 6,
        color: COLOR_PRIMARY,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400'
    }
})

export default CartToolbar
