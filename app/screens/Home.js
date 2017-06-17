// @flow
'use strict';

import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    PushNotificationIOS,
    Platform
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import SearchBarHolder from '../components/SearchBarHolder'
import CartBottomBar from '../components/CartBottomBar'
import AppSwiper from '../components/AppSwiper'
import GridView from '../components/GridView'
import CategoryItem from "../components/CategoryItem";
import {IconsLoaded, IconsMap} from '../utils/icons'
import {connect} from 'react-redux'
import {
    logOut,
    fetchCategories,
    storeDeviceToken,
    updateInstallationUser,
    fetchOffers,
    addToCart
} from '../actions/index'
import strings from '../utils/strings'
import {GCM_SENDER_ID} from '../utils/constants'

import type {Dispatch, Category, Product} from '../types'

class Home extends React.Component {

    props: {
        navigator: any,
        quantity: number,
        dispatch: Dispatch,
        categories: Array<Category>,
        offers: Array<Product>
    }

    static defaultProps = {
        quantity: 0,
        categories: [],
        offers: []
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
        this.props.dispatch(fetchOffers())


        PushNotification.configure({
            onRegister: (token) => {
                console.log(token)
                this.props.dispatch(storeDeviceToken(token))
                this.props.dispatch(updateInstallationUser())
            },
            onNotification: (notification) => {
                console.log(notification)
                this.showLocalNotification(notification)
            },
            onError: (error) => {
                console.log('Error', error)
            },
            popInitialNotification: true,
            senderID: GCM_SENDER_ID,
            requestPermissions: true,
            permissions: {
                alert: true,
                badge: true,
                sound: true
            }
        })

    }

    render() {

        return (
            <View style={styles.container}>
                <SearchBarHolder search={(keyword) => {
                    this.props.navigator.push({
                        screen: 'sepetim.Search',
                        title: strings.search,
                        passProps: {
                            keyword: keyword
                        }
                    })
                }}/>

                <ScrollView>
                    <AppSwiper
                        offers={this.props.offers}
                        addToCart={(product: Product) => {
                            this.props.dispatch(addToCart(product))
                        }}
                    />
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

        if (event.id === 'notifications') {

            this.props.navigator.push({
                screen: "sepetim.Notifications",
                title: strings.notifications,
                backButtonTitle: strings.back,
                backButtonHidden: false
            })

        } else if (event.id === 'sideMenu') {
            this.props.navigator.toggleDrawer({side: 'left', animated: true})
        } else if (event.type = "DeepLink") {

            if (event.link === "notifications") {
                this.props.navigator.push({
                    screen: "sepetim.Notifications",
                    title: strings.notifications,
                    backButtonTitle: strings.back,
                    backButtonHidden: false
                })
            } else if (event.link === "account") {
                this.props.navigator.push({
                    screen: "sepetim.Account",
                    title: strings.account,
                    backButtonTitle: strings.back,
                    backButtonHidden: false
                })
            } else if (event.link === 'categories') {

                this.props.navigator.push({
                    screen: "sepetim.ShopCategories",
                    title: strings.shopCategory,
                    backButtonTitle: strings.back,
                    backButtonHidden: false
                })

            } else if (event.link === 'offers') {

                this.props.navigator.push({
                    screen: "sepetim.ShopOffers",
                    title: strings.shopOffers,
                    backButtonTitle: strings.back,
                    backButtonHidden: false
                })

            } else if (event.link === "logout") {

                this.props.dispatch(logOut())

            } else if (event.link === 'editAddress') {

                this.props.navigator.push({
                    screen: "sepetim.MapHelper",
                    title: strings.editAddress,
                    backButtonTitle: strings.back,
                    backButtonHidden: false
                })
            }
        }
    }

    renderNavigationBarButtons() {
        IconsLoaded.then(() => {
            this.props.navigator.setButtons({
                rightButtons: [{
                    id: 'notifications',
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

    _goToCart() {
        this.props.navigator.showModal({
            screen: 'sepetim.Cart',
            title: strings.cart,
            animationType: 'slide-up'
        })
    }


    showLocalNotification(notification) {

        const {data} = notification

        if (data === undefined) {
            return
        }

        if (data.alert === undefined) {
            return
        }

        if (notification.foreground) {
            PushNotification.localNotification({
                title: data.title,
                message: data.alert,
            })
        }
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
        categories: state.product.categories,
        user: state.user,
        offers: state.product.offers
    }
}

export default connect(mapStateToProps)(Home)
