import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ListView,
  Button
} from 'react-native'
import CartListItem from '../components/CartListItem'
import {IconsLoaded, IconsMap} from '../../utils/icons'
import {connect} from 'react-redux'
import {addToCart,fetchProducts} from '../../actions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }

    this.dataSource = ds.cloneWithRows([])

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this._renderRightNavButtons()
  }

  componentWillUpdate(nextProps, nextState) {
    this.dataSource = ds.cloneWithRows(nextProps.products)
  }

  _renderRightNavButtons() {
    IconsLoaded.then(() => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            id: 'cart',
            disableIconTint: true,
            icon: IconsMap['cart']
          }
        ],
        animated: true
      });
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>{this.state.counter}</Text>
        <Button title="Fetch Items from Parse Server" onPress={this.fetchProducts.bind(this)}/>
        <MaterialIcon.Button name="add-shopping-cart" backgroundColor="#000000" onPress={this._onButtonPress.bind(this)}>
          Sepete Ekle
        </MaterialIcon.Button>
        <ListView
          style={styles.list}
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={this.renderRow}/>
      </View>
    )
  }

  renderRow(row){
    return <CartListItem title={row.id} />
  }

  onNavigatorEvent(event) {

    if (event.id === 'cart') {
      this.props.navigator.toggleDrawer({side: 'right', animated: true})
    }
  }

  _onButtonPress() {
    // this.props.navigator.toggleNavBar({
    //   to: 'hidden',
    //   animated: true
    // })
    // this.props.navigator.push({
    //   screen: 'sepetim.Register',
    //   title: 'Register',
    //   backButtonHidden: false
    // })

    this.setState({
      counter: (this.state.counter + 1)
    })

    this.props.dispatch(addToCart('hasan'))
  }

  fetchProducts(){
    this.props.dispatch(fetchProducts())
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  list: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
    return {products: state.products}
}

export default connect(mapStateToProps)(Home)
