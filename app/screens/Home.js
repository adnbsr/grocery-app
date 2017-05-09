// @flow
'use strict';

import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    ListView,
    Button,
    Platform,
    TextInput,
    ScrollView
} from 'react-native'
import SnackBar from 'react-native-snackbar'
import CartListItem from '../components/CartListItem'
import ProductItem from '../components/ProductItem'
import SearchBarHolder from '../components/SearchBarHolder'
import CartBottomBar from '../components/CartBottomBar'
import AppSwiper from '../components/AppSwiper'
import GridView from '../components/GridView'
import {IconsLoaded, IconsMap} from '../utils/icons'
import {connect} from 'react-redux'
import {addToCart, fetchProducts, searchProducts, logOut, fetchCategories} from '../actions/index'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import type {Product, Dispatch, Category} from '../types'


class Home extends React.Component {

    state: {
        dataSource: ListView.DataSource
    }

    props: {
        data: Array<Product>,
        navigator: any,
        quantity: number,
        dispatch: Dispatch,
        categories: Array<Category>
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

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.renderNavigationBarButtons()
    }

    componentDidMount(){
        this.props.dispatch(fetchCategories())
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

                <ScrollView>
                    <AppSwiper />

                    <GridView
                        fillMissingItems={true}
                        itemsPerRow={3}
                        data={this.props.categories}
                        renderItem={this.renderCategoryItem.bind(this)}/>

                    <ListView
                        style={styles.list}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}/>

                </ScrollView>
                <CartBottomBar goToCart={this._goToCart.bind(this)} quantity={this.props.quantity}/>

            </View>
        )
    }

    renderRow(product: Product) {
        return <ProductItem product={product} addToCart={this._addToCart.bind(this)}/>
    }

    renderCategoryItem(item: Category) {
        return (
            <View style={styles.categoryItem}>
                <Image source={{uri: item.thumbnail}} style={{padding:2, flexGrow: 1}} resizeMode={'contain'}/>
                <Text style={{textAlign: 'center', padding: 8, fontWeight: '600'}}>{item.name}</Text>
            </View>
        )
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
            } else if (event.link === "account") {
                this.props.navigator.push({
                    screen: "sepetim.Account",
                    title: "My Account",
                    backButtonTitle: "Back",
                    backButtonHidden: false
                })
            } else if (event.link === "logout") {
                this.props.dispatch(logOut())
            } else if (event.link === 'editAddress') {
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
    },
    categoryItem: {
        flex: 1,
        height: 168,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 4
    }
})

function mapStateToProps(state) {

    return {
        data: state.product.all,
        quantity: state.cart.items.entrySeq().toArray().length,
        address: state.user.address,
        categories: state.product.categories
    }
}

export default connect(mapStateToProps)(Home)
