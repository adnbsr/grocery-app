// @flow
'use strict';

import React from 'react'
import {
    View,
    StyleSheet,
    Platform,
    ScrollView
} from 'react-native'
import ProductItem from '../components/ProductItem'
import SearchBarHolder from '../components/SearchBarHolder'
import CartBottomBar from '../components/CartBottomBar'
import AppSwiper from '../components/AppSwiper'
import GridView from '../components/GridView'
import CategoryItem from "../components/CategoryItem";
import {IconsLoaded, IconsMap} from '../utils/icons'
import {connect} from 'react-redux'
import {addToCart, fetchProducts, logOut, fetchCategories} from '../actions/index'

import type {Product, Dispatch, Category} from '../types'


class Home extends React.Component {

    props: {
        navigator: any,
        quantity: number,
        dispatch: Dispatch,
        categories: Array<Category>
    }

    static defaultProps = {
        quantity: 0
    }

    static navigatorStyle = {
        navBarNoBorder: true
    }

    constructor(props) {
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.renderNavigationBarButtons()
    }

    componentDidMount() {
        this.props.dispatch(fetchCategories())
    }

    render() {

        return (
            <View style={styles.container}>
                <SearchBarHolder search={(keyword) => {
                    this.props.navigator.push({
                        screen: 'sepetim.Search',
                        title: "Search",
                        passProps: {
                            keyword: keyword
                        }
                    })
                }}/>

                <ScrollView>
                    <AppSwiper />
                    <GridView
                        fillMissingItems={true}
                        itemsPerRow={3}
                        data={this.props.categories}
                        renderItem={this.renderCategoryItem.bind(this)}/>
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
            <CategoryItem
                category={item}
                onPress={(category) => {
                    this.props.navigator.push({
                        screen: 'sepetim.CategoryDetail',
                        title: category.name,
                        passProps: {
                            category: category
                        }
                    })
                }}/>
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
            } else if (event.link === 'categories') {

                this.props.navigator.push({
                    screen: "sepetim.ShopCategories",
                    title: "Categories",
                    backButtonTitle: "Back",
                    backButtonHidden: false
                })

            } else if (event.link === 'offers') {

                this.props.navigator.push({
                    screen: "sepetim.ShopOffers",
                    title: "Offers",
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
    }

    fetchProducts() {
        this.props.dispatch(fetchProducts())
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

    return {
        quantity: state.cart.items.entrySeq().toArray().length,
        categories: state.product.categories
    }
}

export default connect(mapStateToProps)(Home)
