import React from 'react'
import {Text, View, ListView, StyleSheet} from 'react-native'
import CartToolbar from '../components/CartToolbar'
import CartListItem from '../components/CartListItem'
import {connect} from 'react-redux'

class Cart extends React.Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows([])

  }

  render() {
    return (
      <View style={styles.container}>
        <CartToolbar cartSize={this.props.cartItems.length}/>
        <ListView dataSource={this.dataSource} renderRow={this.renderRow} enableEmptySections={true}/>
      </View>
    );
  }

  renderRow(cartItem) {
    return (<CartListItem title={cartItem}/>)
  }

  componentWillUpdate(nextProps, nextState) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(nextProps.cartItems)
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'
  }

})

const mapStateToProps = (state, ownProps) => {
  return {cartItems: state.cartItems}
}

export default connect(mapStateToProps)(Cart)
