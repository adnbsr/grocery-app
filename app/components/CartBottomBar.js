// @flow

import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    Platform,
    TouchableOpacity
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {MD_LIGHT_BLUE_500, MD_RED_400} from '../utils/constants'

class CartBottomBar extends React.Component {

    props: {
        goToCart: () => any,
        badgeSize: number,
        quantity: number
    }

    static propTypes = {
        goToCart: React.PropTypes.func.isRequired,
        badgeSize: React.PropTypes.number
    }

    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

        return (
            <View style={styles.container}>
                <View style={styles.informationBar}>
                    <Text style={styles.informationText}>
                        STANDART: Tomorrow 5:00 PM to 19:30 PM
                    </Text>
                    <Text style={styles.informationText}>
                        EXPRESS: By Tomorrow 8:30 AM
                    </Text>
                </View>
                <Touchable onPress={this.props.goToCart} style={{flexGrow: 1, backgroundColor: 'blue', minWidth: 56}}>
                    <View style={styles.cartIconBar}>
                        <MaterialIcon name="shopping" color="#FFFFFF" size={24}/>
                        <Text style={styles.quantity}>{this.props.quantity}</Text>
                    </View>
                </Touchable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
    },
    informationBar: {
        flexGrow: 4,
        flexDirection: 'column',
        backgroundColor: '#424242',
        justifyContent: 'center',
        padding: 8
    },
    informationText: {
        color: 'white'
    },
    cartIconBar: {
        minWidth: 56,
        height: 56,
        backgroundColor: MD_RED_400,
        padding: 16,
        alignItems: 'stretch'
    },
    quantity: {
        height: 16,
        width: 16,
        overflow: 'hidden',
        borderRadius: 8,
        fontSize: 8,
        color: 'white',
        marginTop: -32,
        marginLeft: 12,
        textAlign: 'center',
        padding: 2,
        backgroundColor: MD_LIGHT_BLUE_500
    }

})

export default CartBottomBar
