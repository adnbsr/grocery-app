/**
 * Created by adnanbasar on 30/04/2017.
 *
 * @flow
 */

import React from 'react'
import {StyleSheet, View, Text, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native'
import {MD_BLUE_GRAY_800, COLOR_WHITE} from '../utils/colors'
import Icon from 'react-native-vector-icons/Ionicons'

class DrawerHeader extends React.Component {

    props: {
        name: string,
        address: string,
        editAddress: () => any
    }

    static defaultProps = {
        name: "Bekir Eymenoglu",
        address: "10 ýyl Abadançylyk köçesi, Aşkabat"
    }



    render() {


        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.name}</Text>
                <View style={styles.addressBar}>
                    <Icon name="ios-pin" color={COLOR_WHITE} size={24}/>
                    <Text style={styles.addressTitle} numberOfLines={1}>{this.props.address}</Text>
                    <Touchable onPress={() => this.props.editAddress()}>
                        <Icon name="md-create" color={COLOR_WHITE} size={24}/>
                    </Touchable>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 96,
        backgroundColor: MD_BLUE_GRAY_800,
        paddingTop: 24,
        flexDirection: 'column'
    },
    text: {
        color: COLOR_WHITE,
        fontSize: 16,
        paddingLeft: 8,
        flex: 5
    },
    addressBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 8,
        flex: 5
    },
    addressTitle: {
        color: COLOR_WHITE,
        textAlign: 'left',
        fontSize: 12,
        flex: 4,
        paddingLeft: 8,
        paddingRight: 8

    }
})


export default DrawerHeader