/**
 * Created by adnanbasar on 30/04/2017.
 *
 * @flow
 */

import React from 'react'
import {View, StyleSheet} from 'react-native'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import GridView from '../components/GridView'
import CategoryItem from '../components/CategoryItem'
import {connect} from 'react-redux'
import {fetchCategories} from '../actions'

import type {Category, Dispatch} from '../types'

class ShopCategories extends React.Component {

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY,
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE
    }

    props: {
        categories: Array<Category>,
        dispatch: Dispatch
    }

    componentDidMount(){
        this.props.dispatch(fetchCategories())
    }

    render() {
        return (
            <View style={styles.container}>
                <GridView
                    fillMissingItems={true}
                    itemsPerRow={3}
                    data={this.props.categories}
                    renderItem={this.renderCategoryItem.bind(this)}/>
            </View>
        );
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        alignItems: 'stretch',
        justifyContent: 'center'
    }
})

function mapStateToProps(state) {
    return {
        categories: state.product.categories
    }
}

export default connect(mapStateToProps)(ShopCategories)
