/**
 * Created by adnanbasar on 07/05/2017.
 */

import React from 'react'
import {View, Text, StyleSheet, Image, processColor} from 'react-native'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import Swiper from 'react-native-swiper';
import strings from '../utils/strings'
import {SCREEN_WIDTH} from '../utils'
import Button from "./Button"

import type {Product} from '../types'


class AppSwiper extends React.Component {

    props: {
        offers: Array<Object>,
        addToCart: (product: Product) => any
    }

    static defaultProps = {
        offers: []
    }

    render() {

        return (
            <Swiper style={styles.wrapper}
                    showsButtons={false}
                    width={SCREEN_WIDTH}
                    height={height}
                    activeDotColor={COLOR_PRIMARY}
                    dotColor={COLOR_WHITE}
                    autoplay={true}>
                {this.props.offers.map((item: Product, index) => {
                    return (
                        <View style={styles.slide} key={index}>
                            <Image
                                source={{uri: item.thumbnail}}
                                style={styles.thumbnail}
                                resizeMode={'contain'}/>
                            <View style={styles.detailContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.category} numberOfLines={1}>{item.category.name}</Text>
                                </View>
                                <Text style={styles.price}>{`${item.price} ${strings.currency}`}</Text>
                                <Button title={strings.add} onPress={() => this.props.addToCart(item)} style={styles.addButton}/>
                            </View>

                        </View>
                    )
                })}

            </Swiper>
        )
    }
}

const height = (SCREEN_WIDTH / 4 ) * 3


const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start'
    },
    detailContainer: {
        flexDirection: 'row',
        height: 56,
        padding: 8,
        marginTop: -1 * height,
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(3,169,244,0.5)',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    thumbnail: {
        width: SCREEN_WIDTH,
        height: height,
    },
    textContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        flexGrow: 3,
        maxWidth: SCREEN_WIDTH / 2,
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    category: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        flexGrow: 1
    },
    addButton: {
        maxHeight: 40,
        backgroundColor: COLOR_PRIMARY
    }
})

export default AppSwiper