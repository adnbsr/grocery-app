// @flow
/**
 * Created by adnanbasar on 27/04/2017.
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DrawerHeader from '../components/DrawerHeader'
import DrawerItem from '../components/DrawerItem'
import Button from '../components/Button'
import CompatListView from '../components/CompatListView'
import {COLOR_WHITE, COLOR_PRIMARY, MD_RED_400} from '../utils/colors'
import {connect} from 'react-redux'
import strings from '../utils/strings'

import type {DrawerAbstractItem} from '../types'
import Touchable from "../components/Touchable";

class Drawer extends React.Component {

    props: {
        name: string,
        address: string,
        isUserLoggedIn: boolean,
        data: Array<DrawerAbstractItem>,
        navigator: any
    }

    static defaultProps = {
        name: strings.unknown,
        address: strings.unknown,
        data: [
            {type: "home", label: strings.home},
            {type: "account", label: strings.account},
            {type: "categories", label: strings.shopCategory},
            {type: "offers", label: strings.shopOffers},
            {type: "notifications", label: strings.notifications},
            {type: "logout", label: strings.logout}
        ]
    }

    render() {

        if (this.props.isUserLoggedIn) {
            return (
                <View style={styles.container}>
                    <DrawerHeader
                        editAddress={() => this.handleRowSelect({type: 'editAddress', label: "Address"})}
                        name={this.props.name}
                        address={this.props.address}/>

                    <CompatListView
                        data={this.props.data}
                        renderRow={this.renderRow.bind(this)}
                        style={styles.list}/>
                </View>
            )
        } else {
            return (
                <View style={[styles.container && {alignItems: 'stretch', justifyContent: 'center'}]}>

                    <Button
                        title={strings.login}
                        style={styles.button}
                        onPress={() => {
                            this.props.navigator.showModal({
                                screen: 'sepetim.Login',
                                title: strings.login,
                                animationType: 'slide-up'
                            })
                        }}/>

                    <Button
                        title={strings.signup}
                        style={styles.button}
                        onPress={() => {
                            this.props.navigator.showModal({
                                screen: 'sepetim.Signup',
                                title: strings.signup,
                                animationType: 'slide-up'
                            })
                        }}/>
                </View>
            )
        }


    }

    renderRow(row: DrawerAbstractItem) {
        return <DrawerItem item={row} select={(item) => this.handleRowSelect(item)}/>
    }

    handleRowSelect(row: DrawerAbstractItem) {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
            to: 'closed'
        })

        this.props.navigator.handleDeepLink({
            link: row.type
        })

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLOR_WHITE
    },
    list: {
        padding: 8
    },
    button: {
        height: 48,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: MD_RED_400
    }
})

function mapStateToProps(state) {
    return {name: state.user.name, address: state.user.address, isUserLoggedIn: state.user.isUserLoggedIn}
}

export default connect(mapStateToProps)(Drawer)