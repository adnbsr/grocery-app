// @flow
'use strict';

import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    ListView,
    Button,
    Platform,
    TextInput
} from 'react-native'
import SnackBar from 'react-native-snackbar'
import CartListItem from '../components/CartListItem'
import ProductItem from '../components/ProductItem'
import SearchBarHolder from '../components/SearchBarHolder'
import CartBottomBar from '../components/CartBottomBar'
import {IconsLoaded, IconsMap} from '../utils/icons'
import {connect} from 'react-redux'
import {addToCart, fetchProducts, searchProducts, logOut} from '../actions/index'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import type {Product} from '../types'


class Home extends React.Component {

    state: {
        dataSource: ListView.DataSource,
        name: string
    }

    props: {
        data: Array<Product>,
        navigator: any,
        quantity: number
    }

    static defaultProps = {
        data: [],
        quantity: 0
    }

    static navigatorStyle = {
        navBarNoBorder: true
    }

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: ds.cloneWithRows(this.props.data)
        }

        this.renderRow = this.renderRow.bind(this)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.renderNavigationBarButtons()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <SearchBarHolder search={(keyword) => this._searchProducts(keyword)}/>
                <ListView
                    style={styles.list}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>
                <CartBottomBar goToCart={this._goToCart.bind(this)} quantity={this.props.quantity}/>

            </View>
        )
    }

    renderRow(row: Product) {
        return <ProductItem product={row} addToCart={(product) => this._addToCart(product)}/>
    }

    goToProductDetail(id: string) {
        console.log(id);
        this.props.navigator.push({
            screen: 'sepetim.ProductDetail'
        })
    }

    onNavigatorEvent(event) {

        if (event.id === 'cart') {
            this.fetchProducts()
        } else if (event.id === 'sideMenu') {
            this.props.navigator.toggleDrawer({side: 'left', animated: true})
        } else if (event.type = "DeepLink") {

            if (event.link === "notifications") {
                this.props.navigator.push({
                    screen: "sepetim.Notifications",
                    title: "Notifications",
                    backButtonTitle: "Back",
                    backButtonHidden: false
                })
            }else if (event.link === "account") {
                this.props.navigator.push({
                    screen: "sepetim.Account",
                    title: "My Account",
                    backButtonTitle: "Back",
                    backButtonHidden: false
                })
            }else if (event.link === "logout") {
                this.props.dispatch(logOut())
            }else if (event.link === 'editAddress') {
                this.props.navigator.push({
                    screen: "sepetim.MapHelper",
                    title: "Edit Address",
                    backButtonTitle: "Back",
                    backButtonHidden: false
                })
            }
        }
    }

    renderNavigationBarButtons() {
        IconsLoaded.then(() => {
            this.props.navigator.setButtons({
                rightButtons: [{
                    id: 'cart',
                    disableIconTint: true,
                    icon: IconsMap['notifications']
                }],
                leftButtons: [
                    Platform.select({
                        ios: {
                            id: 'sideMenu',
                            icon: IconsMap['menu']
                        }, android: {
                            id: 'sideMenu'
                        }
                    })
                ],
                animated: true
            })
        })
    }


    _addToCart(product: Product) {
        this.props.dispatch(addToCart(product))

        SnackBar.show({
            title: 'Urun listeye eklendi',
            duration: SnackBar.LENGTH_SHORT
        })

    }

    fetchProducts() {
        this.props.dispatch(fetchProducts())
    }

    _searchProducts(keyword) {
        if (keyword !== undefined && keyword.length > 2) {
            this.props.dispatch(searchProducts(keyword))
        }

        this.setState({
            name: keyword
        })

    }

    goToSearchView() {
        this.props.navigator.push({
            screen: 'sepetim.Search',
            animated: true,
            backButtonHidden: false
        })
    }

    _goToCart() {
        this.props.navigator.showModal({
            screen: 'sepetim.Cart',
            title: 'Sepettekiler',
            animationType: 'slide-up'
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2
    },
    list: {
        flex: 1
    }
})

function mapStateToProps(state) {
    return {data: state.product.all, quantity: state.cart.items.entrySeq().toArray().length, address: state.user.address}
}

export default connect(mapStateToProps)(Home)
