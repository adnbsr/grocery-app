import React from 'react'
import {Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  name : {
    fontSize : 14,
    fontWeight : '600'
  }
})


const HelloTab = ({title}) => {
  return (
    <Text style={styles.name}>{title}</Text>
  )
}

HelloTab.propTypes = {
  title : React.PropTypes.string.isRequired
}

export default HelloTab
