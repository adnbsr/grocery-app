// @flow

import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Parse from 'parse/react-native'
import {MD_RED_400, COLOR_WHITE} from '../utils/colors'
import strings from '../utils/strings'

import type {Product} from '../types'

class ProductItem extends React.Component {

    props: {
        product: Product,
        addToCart: (product: Product) => void
    }

    render() {

        return (
            <View style={styles.container}>
              <Image
                  style={styles.icon}
                  source={{uri: this.props.product.thumbnail}}/>

              <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {this.props.product.name}
                </Text>

                <Text style={styles.category}>
                    {this.props.product.category.name}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 36
                }}>
                  <Text style={styles.price}>
                      {this.props.product.price && this.props.product.price.toFixed(2)}
                  </Text>
                  <Text style={styles.quantity} onPress={this.handleAddToCart.bind(this)}>
                      {strings.add}
                  </Text>
                </View>
              </View>
            </View>
        )
    }

    handleAddToCart(){
        this.props.addToCart(this.props.product)
    }
}

const styles = StyleSheet.create({
    container: {
        height: 112,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#757575'
    },
    icon: {
        width: 112,
        height: 112,
        alignSelf: 'flex-start',
        resizeMode: 'contain'
    },
    textContainer: {
        padding: 2,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexGrow: 1

    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '600',
        padding: 8,
        flex: 3,

    },
    category: {
        fontStyle: 'italic',
        flex: 3,
        textAlign: 'left',
        padding: 8
    },
    price: {
        padding: 8,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        flex: 1,

    },
    quantity: {
        fontSize: 18,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: MD_RED_400,
        color: COLOR_WHITE,
        textAlign: 'center',
        borderRadius: 2,
        overflow: 'hidden'
    }
})

export default ProductItem
