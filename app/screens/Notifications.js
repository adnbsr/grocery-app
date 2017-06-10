/**
 * Created by adnanbasar on 30/04/2017.
 *
 * @flow
 */

import React from 'react'
import {View, StyleSheet, Alert} from 'react-native'
import SnackBar from 'react-native-snackbar'
import CompatListView from '../components/CompatListView'
import OrderItem from '../components/OrderItem'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import {connect} from 'react-redux'
import {fetchOrders, cancelOrder} from '../actions'
import strings from '../utils/strings'

import type {Dispatch, Order} from '../types'

class Notifications extends React.Component {

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY,
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE
    }

    props: {
        userId: string,
        data: Array<Object>,
        dispatch: Dispatch,
        cancel: boolean
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchOrders(this.props.userId))
    }

    componentWillReceiveProps(nextProps){

        if (this.props.cancel === false && nextProps.cancel === true) {
            SnackBar.show({
                title: strings.orderCanceled
            })
            this.props.dispatch(fetchOrders(this.props.userId))
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <CompatListView
                    data={this.props.data}
                    renderRow={this.renderRow.bind(this)}/>
            </View>
        )
    }

    renderRow(order: Order) {
        return (
            <OrderItem
                order={order}
                onPress={(order: Order) => {

                    if (order.orderState === 'nonApproved') {

                        Alert.alert(strings.cancelOrderTitle, undefined, [
                            {
                                text: strings.no,
                                onDismiss: () => {
                                }
                            },
                            {
                                text: strings.yes,
                                onPress: () => {
                                    this.props.dispatch(cancelOrder(order.id))
                                }
                            }])
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    }
})

function mapStateToProps(state) {
    return {data: state.order.list, userId: state.user.id, cancel: state.order.cancel}
}

export default connect(mapStateToProps)(Notifications)
