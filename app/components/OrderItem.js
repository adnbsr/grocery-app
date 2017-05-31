/**
 * Created by adnanbasar on 18/05/2017.
 *
 * @flow
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {ORDER_ITEMS_BACKGROUND, ORDER_LEFT_BORDER, MD_GREY_50, MD_RED_500} from '../utils/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import strings from '../utils/strings'

class OrderItem extends React.Component {

    props: {
        order: Object
    }

    static propTypes = {
        order: React.PropTypes.object.isRequired
    }

    render() {

        const orderIcon = this.props.order.deliveryType === 'standard' ? 'ios-bicycle-outline' : 'ios-car-outline'
        const {orderState} = this.props.order
        const orderStateText = strings.orderState[orderState]


        return (
            <View style={styles.container}>
                <View style={styles.upContianer}>
                    <Icon name={orderIcon} size={24}/>
                    <Text>{`${this.props.order.total} TMT`}</Text>
                    <Text style={styles.orderState}>{orderStateText}</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Icon name="ios-pin-outline" size={24}/>
                    <Text style={styles.address}>{this.props.order.address}</Text>
                </View>
                <View style={styles.items}>
                    {this.props.order.items.map((value, index) => {

                        const product = value[0]

                        return (
                            <View key={index}
                                  style={{justifyContent: 'space-between', flexDirection: 'row', padding: 4}}>
                                <Text>{product.name}</Text>
                                <Text>{`${value[1]} x ${product.price} TMT`}</Text>
                            </View>)
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 8,
        backgroundColor: MD_GREY_50,
        borderTopWidth: 2,
        borderTopColor: ORDER_LEFT_BORDER
    },
    upContianer: {
        minHeight: 56,
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 16,
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    items: {
        flexGrow: 1,
        flexDirection: 'column',
        marginLeft: 4,
        borderLeftWidth: 2,
        borderLeftColor: ORDER_LEFT_BORDER,
        backgroundColor: ORDER_ITEMS_BACKGROUND,

    },
    address: {
        paddingLeft: 16
    },
    orderState: {
        borderRadius: 12,
        padding: 4,
        textAlign: 'center',
        borderWidth: 0.5,
        borderColor: MD_RED_500,
        color: MD_RED_500,
        overflow: 'hidden'
    }
})

export default OrderItem