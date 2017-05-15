// @flow

import React from 'react'
import {Text, View, ListView, StyleSheet, Platform, Picker} from 'react-native'
import {Map} from 'immutable'
import CartListItem from '../components/CartListItem'
import CartToolbar from '../components/CartToolbar'
import DeliveryPicker, {STANDARD, EXPRESS} from '../components/DeliveryPicker'
import {addToCart, removeFromCart, giveOrder, clearCart, clearOrder} from '../actions'
import {connect} from 'react-redux'
import {IconsLoaded, IconsMap} from '../utils/icons'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import SnackBar from 'react-native-snackbar'

import type {Dispatch} from '../types'

class Cart extends React.Component {

    props: {
        data: Array<Object>,
        cartTotal: number,
        navigator: any,
        address: string,
        dispatch: Dispatch,
        user: any
    }

    state: {
        dataSource: ListView.DataSource,
        deliveryType: string
    }

    static defaultProps = {
        data: [],
        cartTotal: 0
    }

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY,
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE,
        backButtonHidden: false
    }

    constructor(props) {

        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = {
            getRowData: (dataBlob, sid, rid,) => dataBlob[sid][rid],
            dataSource: ds.cloneWithRows(this.props.data),
            deliveryType: STANDARD
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

    }

    componentDidMount() {

        IconsLoaded.then(() => {

            var icon = {
                id: 'cancel'
            }

            if (Platform.OS === 'ios') {
                icon = Object.assign({}, icon, {icon: IconsMap['cancel']})
            }

            this.props.navigator.setButtons({
                leftButtons: [icon]
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                dataSource: cloneWithRows(this.state.dataSource, nextProps.data)
            })
        }

        if (nextProps.orderStatus  === 'given' && nextProps.cartTotal !== 0) {
            SnackBar.show({
                title: 'Order is given and waiting for approval',
                duration: SnackBar.LENGTH_LONG
            })

            this.props.dispatch(clearCart())
            this.props.dispatch(clearOrder())
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <CartToolbar cartSize={this.props.data.length} total={this.props.cartTotal}/>
                <DeliveryPicker type={this.state.deliveryType} onDeliverySelected={(type) => {this.setState({deliveryType: type})}}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}/>
                <Text style={styles.checkout} onPress={() => this.onCheckout()}>CHECKOUT</Text>
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'cancel') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    renderRow(row: Object, section: number) {
        return (<CartListItem item={row[0]} increment={(item) => this.increment(item)}
                              decrement={(item) => this.decrement(item)} quantity={row[1]}/>)
    }

    increment(item) {
        this.props.dispatch(addToCart(item))
    }

    decrement(item) {
        this.props.dispatch(removeFromCart(item))
    }

    onCheckout() {

        if (this.props.cartTotal === 0) {
            return;
        }

        this.props.dispatch(giveOrder(this.props.user, this.props.data, this.props.cartTotal, this.props.address, this.state.deliveryType))

    }

}

const cloneWithRows = (ds: ListView.DataSource, data: Array<Object>) => {

    if (!data) {
        return ds.cloneWithRows([])
    }

    return ds.cloneWithRows(data)
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'stretch'
    },
    checkout: {
        height: 56,
        fontSize: 20,
        fontWeight: '500',
        padding: 16,
        backgroundColor: '#424242',
        textAlign: 'center',
        color: COLOR_WHITE
    }

})


function mapStateToProps(state) {

    const items = state.cart.items

    if (items instanceof Map) {
        return {
            data: state.cart.items.entrySeq().toArray(),
            cartTotal: state.cart.total.toFixed(2) / 1,
            user: state.user,
            address: state.user.address,
            orderStatus: state.order.orderStatus
        }
    }

    return {data: [], cartTotal: 0}
}

export default connect(mapStateToProps)(Cart)
