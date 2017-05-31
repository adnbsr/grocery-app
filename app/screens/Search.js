/**
 * Created by adnanbasar on 12/05/2017.
 *
 * @flow
 */

import React from 'react'
import {View, StyleSheet} from 'react-native'
import CompatListView from '../components/CompatListView'
import ProductItem from '../components/ProductItem'
import {connect} from 'react-redux'
import {searchProducts,addToCart} from '../actions'
import { COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'

import type {Product, Dispatch} from '../types'

class Search extends React.Component {

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY,
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE
    }

    props: {
        keyword: string,
        data: Array<Product>,
        dispatch: Dispatch,
    }

    static propTypes = {
      keyword: React.PropTypes.string.isRequired
    }

    static defaultProps = {
        data: []
    }

    componentDidMount() {
        this.props.dispatch(searchProducts(this.props.keyword))
    }

    render() {
        return (<View style={styles.container}>
          <CompatListView
              style={styles.list}
              data={this.props.data}
              renderRow={this.renderRow.bind(this)}
          />
        </View> )
    }

    renderRow(product: Product) {
        return (<ProductItem product={product} addToCart={(product) => {
            this.props.dispatch(addToCart(product))
        }}/>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    list: {
        flexGrow: 1
    }
})


function mapStateToProps(state) {
    return {data: state.product.results}
}

export default connect(mapStateToProps)(Search)