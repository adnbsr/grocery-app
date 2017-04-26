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
import SearchBarHolder from '../components/SearchBarHolder'
import CartBottomBar from '../components/CartBottomBar'
import {IconsLoaded, IconsMap} from '../../utils/icons'
import {connect} from 'react-redux'
import {addToCart,fetchProducts} from '../../actions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

class Home extends React.Component {

  state: {
    dataSource: ListView.DataSource
  }

  props: {
    data: Array<Object>
  }

  static defaultProps = {
    data:  []
  }

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource : ds.cloneWithRows(this.props.data)
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this._renderRightNavButtons()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource : this.state.dataSource.cloneWithRows(nextProps.data)
    })
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
        <SearchBarHolder goToSearchView={this.goToSearchView.bind(this)}/>
        <Button title="Fetch Items from Parse Server" onPress={this.fetchProducts.bind(this)}/>
        <MaterialIcon.Button name="add-shopping-cart" backgroundColor="#000000" onPress={this._onButtonPress.bind(this)}>
          Sepet
        </MaterialIcon.Button>
        <ListView
          style={styles.list}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}/>
          <CartBottomBar goToCart= {() => {console.log('Melih');}}/>
      </View>
    )
  }

  renderRow(row){
    return <CartListItem title={row.get('name')} id={row.id}/>
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

  goToSearchView(){
    this.props.navigator.push({
      screen: 'sepetim.Search',
      animated: true,
      backButtonHidden: false
    })
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
    console.log(state);
    return {data: state.product.all}
}

export default connect(mapStateToProps)(Home)
