// @flow

import React from 'react'
import {Text, View, ListView, StyleSheet, Platform} from 'react-native'
import CartToolbar from '../components/CartToolbar'
import CartListItem from '../components/CartListItem'
import {addToCart, removeFromCart} from '../actions'
import {connect} from 'react-redux'
import {IconsLoaded, IconsMap} from '../utils/icons'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/constants'

class Cart extends React.Component {

    props: {
        data: Array<Object>,
        cartTotal: number,
        navigator: any
    }

    state: {
        dataSource: ListView.DataSource
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
            dataSource: ds.cloneWithRows(this.props.data)
        }

        this.renderRow = this.renderRow.bind(this)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

    }

    componentDidMount() {

        IconsLoaded.then(() => {

            var icon = {
                id: 'cancel'
            }

            if (Platform.OS === 'ios'){
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
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<CartToolbar cartSize={this.props.data.length}/>*/}
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} enableEmptySections={true}/>
                <Text style={styles.checkout}>{this.props.cartTotal} TMT</Text>
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
        return (<CartListItem item={row[0]} increment={(item) => this.increment(item)} decrement={(item) => this.decrement(item)} quantity={row[1]}/>)
    }

    increment(item){
        this.props.dispatch(addToCart(item))
    }

    decrement(item){
        this.props.dispatch(removeFromCart(item))
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
        color: 'yellow'
    }

})

const mapStateToProps = (state, ownProps) => {
    return {data: state.cart.items.entrySeq().toArray(), cartTotal: state.cart.total.toFixed(2)}
}

export default connect(mapStateToProps)(Cart)
