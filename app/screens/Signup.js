import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native'
import TextField from 'react-native-md-textinput'
import Button from '../components/Button'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/constants'
import {IconsLoaded, IconsMap} from '../utils/icons'
import Parse from 'parse/react-native'
import {signUp} from '../actions'
import {connect} from 'react-redux'

class Signup extends Component {


    static navigatorStyle = {
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE,
        statusBarColor: COLOR_PRIMARY
    }

    constructor(props) {
        super(props)

        this.state = {
            username: undefined,
            password: undefined,
            name: undefined,
            address: undefined,
            phone: undefined
        }

        this.onSubmitPress = this.onSubmitPress.bind(this)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {

        IconsLoaded.then(() => {
            this.props.navigator.setButtons({
                leftButtons: [
                    {
                        id: 'back',
                        icon: IconsMap['back']
                    }
                ]
            })
        })
    }

    render() {

        return (
            <View style={styles.container}>


              <TextField multiline={false}
                         label={"Name"}
                         value={this.state.name}
                         highlightColor={COLOR_PRIMARY}
                         inputStyle={styles.input}
                         autoCorrect={false}
                         autoCapitalize={'none'}
                         onChangeText={(text) => this.setState({name: text})}/>

              <TextField multiline={false}
                         label={"Username"}
                         value={this.state.username}
                         inputStyle={styles.input}
                         autoCapitalize={'none'}
                         autoCorrect={false}
                         highlightColor={COLOR_PRIMARY}
                         returnKeyType={'done'}
                         onChangeText={(text) => this.setState({username: text})}/>

              <TextField multiline={false}
                         label={"Password"}
                         value={this.state.password}
                         inputStyle={styles.input}
                         highlightColor={COLOR_PRIMARY}
                         returnKeyType={'done'}
                         secureTextEntry={true}
                         onChangeText={(text) => this.setState({password: text})}/>

                <TextField multiline={false}
                           label={"Phone"}
                           value={this.state.phone}
                           inputStyle={styles.input}
                           highlightColor={COLOR_PRIMARY}
                           keyboardType={'phone-pad'}
                           maxLength={10}
                           onChangeText={(text) => this.setState({phone: text})}/>

              <TextField multiline={false}
                         label={"Address"}
                         value={this.state.address}
                         inputStyle={styles.input}
                         autoCapitalize={'none'}
                         autoCorrect={false}
                         highlightColor={COLOR_PRIMARY}
                         returnKeyType={'done'}
                         onChangeText={(text) => this.setState({address: text})}/>

              <Button title="Sign Up" onPress={() => this.onSubmitPress()} style={styles.submit}/>
            </View>
        )
    }

    onNavigatorEvent(event) {
        if (event.id === 'back') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    sendAlert(message: string){
        Alert.alert("Sebetim", message)
    }

    onSubmitPress() {

       console.log(this.state)

        this.props.dispatch(signUp(this.state))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 16,
        backgroundColor: COLOR_WHITE
    },
    input: {
        height: 36,
        lineHeight: 36,
        margin: 8,
        padding: 8
    },
    submit: {
        marginTop: 16,
        margin: 8

    }
})

export default connect()(Signup)