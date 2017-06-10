/**
 * Created by adnanbasar on 05/06/2017.
 *
 * @flow
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Button from '../components/Button'
import {SCREEN_WIDTH} from '../utils'

class ReviewOrderBox extends React.Component {

    props: {
        address: string,
        deliveryType: string,
        expressFee: number,
        total: number,
        onOrder: () => any,
        onCancel: () => any
    }

    static propTypes = {
        address: React.PropTypes.string.isRequired,
        deliveryType: React.PropTypes.string.isRequired,
        expressFee: React.PropTypes.number,
        total: React.PropTypes.number.isRequired,
        onOrder: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired
    }

    render(){

        const {address, deliveryType, total} = this.props
        const deliveryTypeLabel = (str) => str.charAt(0).toUpperCase() + str.substring(1)
        const deliveryFee = deliveryType === 'standard' ? 0 : this.props.expressFee


        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>{`Address: ${address}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text>{`Delivery: ${deliveryTypeLabel(deliveryType)}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text>{`Delivery Fee: ${deliveryFee} TMT`}</Text>
                </View>
                <View style={styles.row}>
                    <Text>{`Total: ${total} + ${deliveryFee} TMT`}</Text>
                </View>
                <View style={[styles.row, {justifyContent: 'space-between', flex: 2}]}>
                    <Button title="Cancel" onPress={() => {this.props.onCancel()}} style={styles.cancelButton} />
                    <Button title="Order" onPress={() => {this.props.onOrder()}} style={styles.orderButton}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.7,
        minHeight: 240,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    row: {
        flexDirection: 'row',
        minHeight:48,
        padding: 8,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    cancelButton: {
        height: 36,
        backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    orderButton: {
        height: 36,
        backgroundColor: 'green',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

export default ReviewOrderBox