// @flow

import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {MD_RED_400} from '../utils/colors'
import {SCREEN_WIDTH} from '../utils'

import type {Product} from '../types'

class CartListItem extends React.Component {

    props: {
        item: Product,
        quantity: number,
        increment: (product: Product) => void,
        decrement: (product: Product) => void
    }

    static propTypes = {
        item: React.PropTypes.object.isRequired,
        increment: React.PropTypes.func.isRequired,
        decrement: React.PropTypes.func.isRequired
    }

    static defaultProps = {
        quantity: 0
    }

    render() {

        return (
            <View style={styles.container}>

                <Image
                    style={styles.icon}
                    source={{uri: this.props.item.thumbnail}}/>

                <View style={styles.textContainer}>

                    <Text style={styles.title}
                        numberOfLines={2}>
                        {this.props.item.name}
                    </Text>


                    <Text style={styles.category}
                        numberOfLines={1}>
                        {this.props.item.category.name}
                    </Text>

                    <Text style={styles.price}>
                        {this.props.item.price && this.props.item.price.toFixed(2)} TMT
                    </Text>

                </View>

                <View style={styles.cartButtonContainer}>
                    <Icon name="ios-remove" color="white" size={24} onPress={() => this.handleDecrement()}/>
                    <Text style={styles.quantity}>
                        {this.props.quantity}
                    </Text>
                    <Icon name="ios-add" color="white" size={24} onPress={() => this.handleIncrement()}/>
                </View>
            </View>
        )
    }

    handleIncrement() {
        this.props.increment(this.props.item)
    }

    handleDecrement() {
        this.props.decrement(this.props.item)
    }
}

const styles = StyleSheet.create({
    container: {
        height: 112,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        borderBottomColor: '#757575',
        borderBottomWidth: 0.5
    },
    icon: {
        margin: 4,
        width: 72,
        height: 72,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    textContainer: {
        maxWidth: SCREEN_WIDTH - 144,
        maxHeight: 108,
        marginTop: 2,
        marginBottom: 2,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',

    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '600',
        padding: 4,
    },
    category: {
        textAlign: 'left',
        padding: 4
    },
    price: {
        padding: 4,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'left',
        color: '#757575'

    },
    quantity: {
        minHeight: 24,
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    cartButtonContainer: {
        height: 40,
        width: 72,
        backgroundColor: MD_RED_400,
        borderRadius: 4,
        overflow: 'hidden',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        marginRight: 8,
        padding: 8
    }

})

export default CartListItem
