import React from 'react'
import {Text, View} from 'react-native'

export default class ErrorScreen extends React.Component {

  render() {
    return (
      <View>
        <Text>
          {this.props.error}
        </Text>
      </View>
    );
  }
}
