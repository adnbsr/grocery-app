// @flow

import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Parse from 'parse/react-native'
import {MD_RED_400, COLOR_WHITE} from '../utils/colors'
import strings from '../utils/strings'
import {SCREEN_WIDTH} from '../utils'

import type {Product} from '../types'
import Button from "./Button";

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

                  <Text style={styles.price}>
                      {this.props.product.price && this.props.product.price.toFixed(2)}
                  </Text>

              </View>
                <Button
                    style={styles.addButton}
                    onPress={this.handleAddToCart.bind(this)}
                    title={strings.add} />
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
        width: 72,
        height: 72,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    textContainer: {
        padding: 2,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexGrow: 1,
        maxWidth: SCREEN_WIDTH - 144

    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '600',
        padding: 4,

    },
    category: {
        fontStyle: 'italic',
        textAlign: 'left',
        padding: 4
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        padding: 4

    },
    addButton: {
        maxHeight: 36,
        backgroundColor: MD_RED_400,
        color: COLOR_WHITE,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        padding: 8,
        overflow: 'hidden'
    }
})

export default ProductItem
