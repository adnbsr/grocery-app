// @flow

import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Parse from 'parse/react-native'

class CartListItem extends React.Component {

    props: {
        title: string,
        id: string,
        price: number
    }

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.string,
        price: React.PropTypes.number.isRequired
    }

    static defaultProps = {
        title: "Title",
        price: 0,

    }

    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.icon}
                    source={{uri: "https://facebook.github.io/react/img/logo_og.png"}}/>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>

                    <Text style={styles.title}>
                        {this.props.id}
                    </Text>

                    <Text style={styles.title}>
                        {this.props.price}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 112,
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    icon: {
        width: 112,
        height: 112,
        alignSelf: 'flex-start'
    },
    textContainer: {
        padding: 4,
        flexDirection: 'column'
    },
    title: {
        fontSize: 14,
        textAlign: 'center'
    }
})

export default CartListItem
