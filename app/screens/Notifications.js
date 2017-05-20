/**
 * Created by adnanbasar on 30/04/2017.
 *
 * @flow
 */


import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import CompatListView from '../components/CompatListView'
import OrderItem from '../components/OrderItem'
import SplashIcon from '../components/SplashIcon'
import {IconsLoaded, IconsMap} from '../utils/icons'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import {connect} from 'react-redux'
import {fetchOrders} from '../actions'


import type {Dispatch} from '../types'

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
        dispatch: Dispatch
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.dispatch(fetchOrders(this.props.userId))
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

    //Todo: order type

    renderRow(order) {
        return (
            <OrderItem order={order} />
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
    return {data: state.order.list, userId: state.user.id}
}

export default connect(mapStateToProps)(Notifications)
