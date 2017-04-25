// @flow

import React from 'react'
import {Text, View, ListView, StyleSheet} from 'react-native'
import CartToolbar from '../components/CartToolbar'
import CartListItem from '../components/CartListItem'
import {connect} from 'react-redux'

class Cart extends React.Component {

  props: {
    data : Array<Object>
  }

  state: {
    dataSource: ListView.DataSource
  }

  static defaultProps = {
    data : []
  }

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      getRowData: (dataBlob, sid, rid,) => dataBlob[sid][rid],
      dataSource: ds.cloneWithRows(this.props.data)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CartToolbar cartSize={this.props.data.length}/>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} enableEmptySections={true}/>
      </View>
    );
  }

  renderRow(row: Object, section: number) {
    return (<CartListItem title="adnan"/>)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithRows(this.state.dataSource, nextProps.data)
      })
    }
  }
}

const cloneWithRows = (ds: ListView.DataSource, data: Array<Object>) => {

  if (!data) {
    return ds.cloneWithRows([])
  }

  return ds.cloneWithRows(data)
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'
  }

})

const mapStateToProps = (state, ownProps) => {
  return {data: state.cart.items}
}

export default connect(mapStateToProps)(Cart)
