import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'

class CartToolbar extends React.Component {

    props: {
        cartSize: string,
        total: number
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{`${this.props.cartSize} Items - ${this.props.total} TMT`}</Text>
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
        fontWeight: 'bold'
    }
})

export default CartToolbar
