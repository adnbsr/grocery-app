// @flow

import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Parse from 'parse/react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {MD_RED_400} from '../utils/colors'

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

                    <Text style={styles.title}>
                        {this.props.item.name}
                    </Text>


                    <Text style={styles.category}>
                        {this.props.item.category.name}
                    </Text>

                    <View style={{
                        flex: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.price}>
                            {this.props.item.price && this.props.item.price.toFixed(2)} TMT
                        </Text>

                        <View style={{
                            height: 36,
                            width: 108,
                            backgroundColor: MD_RED_400,
                            borderRadius: 2,
                            overflow: 'hidden',
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            justifyContent: 'space-around',
                            margin: 4,
                            padding: 6
                        }}>
                            <Icon name="ios-remove" color="white" size={24} onPress={() => this.handleDecrement()}/>
                            <Text style={styles.quantity}>
                                {this.props.quantity}
                            </Text>
                            <Icon name="ios-add" color="white" size={24} onPress={() => this.handleIncrement()}/>
                        </View>
                    </View>
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
        borderBottomWidth: 0.5,
        marginBottom: 8,
        borderBottomColor: '#757575'
    },
    icon: {
        width: 112,
        height: 112,
        alignSelf: 'flex-start',
        resizeMode: 'contain'
    },
    textContainer: {
        padding: 8,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexGrow: 1

    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '600',
        padding: 8,
        flex: 3
    },
    category: {
        flex: 3,
        textAlign: 'left',
        padding: 8
    },
    price: {
        padding: 8,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'left',
        flexGrow: 1,
        color: '#757575'

    },
    quantity: {
        width: 24,
        height: 24,
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 18,
        overflow: 'hidden',
    }

})

export default CartListItem
