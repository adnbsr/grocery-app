// @flow

import React from 'react'
import {Text, View, ListView, StyleSheet, Platform, Alert, ActionSheetIOS} from 'react-native'
import {Map} from 'immutable'
import CartListItem from '../components/CartListItem'
import CartToolbar from '../components/CartToolbar'
import DeliveryPicker, {STANDARD, EXPRESS} from '../components/DeliveryPicker'
import {addToCart, removeFromCart, giveOrder, clearCart, clearOrder, loadConfig} from '../actions'
import {connect} from 'react-redux'
import {IconsLoaded, IconsMap} from '../utils/icons'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import strings from '../utils/strings'
import SnackBar from 'react-native-snackbar'

import type {Dispatch, Product} from '../types'


class Cart extends React.Component {

    props: {
        data: Array<Object>,
        cartTotal: number,
        navigator: any,
        expressFee: number,
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
                leftButtons: [icon],
                rightButtons: [{
                    id: 'clear_cart',
                    icon: IconsMap['trash']
                }]
            })
        })

        this.props.dispatch(loadConfig())
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                dataSource: cloneWithRows(this.state.dataSource, nextProps.data)
            })
        }

        if (nextProps.orderStatus === 'given' && nextProps.cartTotal !== 0) {
            SnackBar.show({
                title: strings.orderGiven,
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
                <DeliveryPicker type={this.state.deliveryType} onDeliverySelected={(type) => {
                    this.setState({deliveryType: type})
                }}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}/>

                <Text style={styles.checkout} onPress={() => this.onCheckout()}>{strings.checkout}</Text>
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'cancel') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }

        if (event.id === 'clear_cart') {

            if (Platform.OS === 'ios') {
                ActionSheetIOS.showActionSheetWithOptions({
                    options: [strings.clearCartTitle, strings.cancel],
                    cancelButtonIndex: 1
                }, (buttonIndex) => {

                    if (buttonIndex === 0) {
                        this.props.dispatch(clearCart())
                    }

                })
            } else {
                Alert.alert(strings.clearCartTitle, strings.clearCartMessage, [
                    {text: strings.cancel},
                    {
                        text: strings.remove, onPress: () => {
                        this.props.dispatch(clearCart())
                    }
                    }
                ])
            }

        }


    }

    renderRow(row: Object, section: number) {

        return (<CartListItem item={row[0]}
                              increment={
                                  (item) => this.props.dispatch(addToCart(item))
                              }
                              decrement={
                                  (item) => this.props.dispatch(removeFromCart(item))
                              }
                              quantity={row[1]}/>)
    }

    onCheckout() {

        if (this.props.cartTotal === 0 ) {
            return;
        }

        if (!this.props.user.isUserLoggedIn) {
            SnackBar.show({
                title: 'Login first',
                duration: SnackBar.LENGTH_SHORT
            })
            return
        }

        this.props.navigator.showLightBox({
            screen: 'sepetim.ReviewOrderBox',
            passProps: {
                address: this.props.address,
                deliveryType: this.state.deliveryType,
                expressFee: this.props.expressFee,
                total: this.props.cartTotal,
                onOrder: this.onOrder.bind(this),
                onCancel: this.onCancel.bind(this),
            },
            style: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }
        })

    }

    onOrder(){
        this.onCancel()
        const total = this.state.deliveryType === 'standard' ? this.props.cartTotal : (this.props.cartTotal + this.props.expressFee)
        this.props.dispatch(giveOrder(this.props.user, this.props.data, total, this.props.address, this.state.deliveryType))
    }

    onCancel(){
        this.props.navigator.dismissLightBox()
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
    const {expressFee} = state.config

    if (items instanceof Map) {
        return {
            data: state.cart.items.entrySeq().toArray(),
            cartTotal: state.cart.total.toFixed(2) / 1,
            user: state.user,
            address: state.user.address,
            orderStatus: state.order.orderStatus,
            expressFee: expressFee
        }
    }

    return {data: [], cartTotal: 0}
}

export default connect(mapStateToProps)(Cart)
