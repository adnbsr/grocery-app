// @flow

import React from 'react'
import {Text, View, ListView, StyleSheet} from 'react-native'
import CartToolbar from '../components/CartToolbar'
import CartListItem from '../components/CartListItem'
import {connect} from 'react-redux'
import {IconsLoaded, IconsMap} from '../../utils/icons'

class Cart extends React.Component {

    props: {
        data: Array<Object>
    }

    state: {
        dataSource: ListView.DataSource
    }

    static defaultProps = {
        data: []
    }

    static navigatorStyle = {
        navBarBackgroundColor: '#F44336',
        navBarTextColor: '#FFFFFF',
        navBarButtonColor: '#FFFFFF'
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

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }

    componentDidMount() {

        IconsLoaded.then(() => {
            this.props.navigator.setButtons({
                leftButtons: [{
                    id: 'close',
                    icon: IconsMap['close']
                }]
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<CartToolbar cartSize={this.props.data.length}/>*/}
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} enableEmptySections={true}/>
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'close') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    renderRow(row: Object, section: number) {
        return (<CartListItem title="adnan" price={120}/>)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                dataSource: cloneWithRows(this.state.dataSource, nextProps.data)
            })
        }
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
        backgroundColor: 'white'
    }

})

const mapStateToProps = (state, ownProps) => {
    return {data: state.cart.items}
}

export default connect(mapStateToProps)(Cart)
