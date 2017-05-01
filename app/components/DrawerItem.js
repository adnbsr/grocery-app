/**
 * Created by adnanbasar on 30/04/2017.
 *
 * @flow
 */

import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {COLOR_BLACK, COLOR_WHITE} from '../utils/constants'
import Icon from 'react-native-vector-icons/Ionicons'
import {IItem} from '../types'

class DrawerItem extends React.Component {

    props: {
        item: IItem,
        select: (item: IItem) => any
    }

    static defaultProps = {
        item: {type: "none", label: "Label"}
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text} onPress={() => {
                    this.props.select(this.props.item)
                }}>{this.props.item.label}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: COLOR_WHITE,
        alignItems: 'flex-start'
    },
    text: {
        color: COLOR_BLACK,
        fontSize: 18,
        padding: 8,
        flex: 1
    }
})


export default DrawerItem