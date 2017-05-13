/**
 * Created by adnanbasar on 12/05/2017.
 */


import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CompatListView from '../components/CompatListView'
import ProductItem from '../components/ProductItem'
import {connect} from 'react-redux'
import {searchProductsInCategory,addToCart} from '../actions'

import type {Product, Dispatch, Category} from '../types'

class CategoryDetail extends React.Component {

    props: {
        category: Category,
        data: Array<Product>,
        dispatch: Dispatch,
    }

    static defaultProps = {
        data: []
    }

    componentDidMount() {
        this.props.dispatch(searchProductsInCategory(this.props.category.id))
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


export default connect(mapStateToProps)(CategoryDetail)