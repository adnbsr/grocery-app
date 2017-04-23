import React from 'react'
import {Text} from 'react-native'

const Product = ({title}) => {

  return (
    <Text>{title}</Text>
  )
}

Product.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Product
