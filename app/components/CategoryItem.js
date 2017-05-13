/**
 * Created by adnanbasar on 09/05/2017.
 */

import React from 'react'
import {View, Text, StyleSheet, Image, Platform, TouchableOpacity, TouchableNativeFeedback} from 'react-native'

import type {Category} from '../types'

class CategoryItem extends React.Component {

    props: {
        category: Category,
        onPress: (category: Category) => any
    }

    static propTypes = {
        category: React.PropTypes.object.isRequired
    }

    render() {

        return (
            <View style={styles.container}>
                <Image
                    source={{uri: this.props.category.thumbnail}}
                    style={styles.thumbnail}
                    resizeMode={'contain'}/>
                <Text style={styles.name}>{this.props.category.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 168,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 4
    },
    thumbnail: {
        flexGrow: 1,
        padding: 2
    },
    name: {
        textAlign: 'center',
        padding: 8,
        fontWeight: '600'
    }
})

function wrapWithTouchable(Component: React.Component): React.Component {
    return class extends React.Component {

        render() {
            const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback

            return (<Touchable onPress={() => {this.props.onPress(this.props.category)}}>
                    <Component {...this.props}/>
                </Touchable>
            )
        }
    }
}


export default wrapWithTouchable(CategoryItem)