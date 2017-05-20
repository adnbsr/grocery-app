// @flow
/**
 * Created by adnanbasar on 27/04/2017.
 */

import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DrawerHeader from '../components/DrawerHeader'
import DrawerItem from '../components/DrawerItem'
import CompatListView from '../components/CompatListView'
import {COLOR_WHITE, COLOR_PRIMARY} from '../utils/colors'
import {connect} from 'react-redux'
import strings from '../utils/strings'

import type {DrawerAbstractItem} from '../types'

class Drawer extends React.Component {

    props: {
        name: string,
        address: string,
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
    }

    renderRow(row: DrawerAbstractItem) {
        return <DrawerItem item={row} select={(item) => this.handleRowSelect(item)} />
    }

    handleRowSelect(row: DrawerAbstractItem){
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
        backgroundColor: COLOR_WHITE
    },
    list: {
        padding: 8
    }
})

function mapStateToProps(state) {
    return {name: state.user.name, address: state.user.address}
}

export default connect(mapStateToProps)(Drawer)