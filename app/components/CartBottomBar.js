// @flow

import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform,
    TouchableOpacity
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Touchable from './Touchable'

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
                <TouchableHighlight style={styles.cartIconBar} onPress={this.props.goToCart}>
                    <MaterialIcon name="shopping" color="#FFFFFF" size={24}/>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    informationBar: {
        flex: 4,
        flexDirection: 'column',
        backgroundColor: '#424242',
        justifyContent: 'center',
        padding: 8
    },
    informationText: {
        color: 'white'
    },
    cartIconBar: {
        flex: 1,
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeSize: {
        height: 20,
        width: 20,
        overflow: 'hidden',
        borderRadius: 10,
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'green'
    }

})

export default CartBottomBar
