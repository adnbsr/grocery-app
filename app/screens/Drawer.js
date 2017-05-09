// @flow
/**
 * Created by adnanbasar on 27/04/2017.
 */

import React from 'react'
import {View, Text, ListView, StyleSheet} from 'react-native'
import DrawerHeader from '../components/DrawerHeader'
import DrawerItem from '../components/DrawerItem'
import {COLOR_WHITE, COLOR_PRIMARY} from '../utils/constants'
import {connect} from 'react-redux'

import type {DrawerAbstractItem} from '../types'

class Drawer extends React.Component {

    props: {
        name: string,
        address: string,
        data: Array<DrawerAbstractItem>,
        navigator: any
    }

    state: {
        dataSource: ListView.DataSource
    }

    static defaultProps = {
        name: "Unknown",
        address: "Unknown",
        data: [
            {type: "home", label: "Home"},
            {type: "account", label: "My Account"},
            {type: "category", label: "Shop By Category"},
            {type: "offers", label: "Shop By Offers"},
            {type: "notifications", label: "Notifications"},
            {type: "logout", label: "Logout"}
        ]
    }

    constructor(props) {
        super(props)

        this.state = {
            dataSource: ds.cloneWithRows(this.props.data)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <DrawerHeader
                    editAddress={() => this.handleRowSelect({type: 'editAddress', label: "Address"})}
                    name={this.props.name}
                    address={this.props.address}/>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
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

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
})

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