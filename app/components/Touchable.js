/**
 * Created by adnanbasar on 28/05/2017.
 */

import React from 'react'
import {View, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native'

class Touchable extends React.Component {

    props: {
        onPress : () => void
    }

    static propsTypes = {
        onPress: React.PropTypes.func.isRequired
    }

    render(){

        if (Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback
                    onPress={this.props.onPress}>
                    <View style={this.props.style}>
                        {this.props.children}
                    </View>
                </TouchableNativeFeedback>
            )
        }else{
            return (
                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={this.props.style}>
                    {this.props.children}
                </TouchableOpacity>
            )
        }

    }
}

export default Touchable