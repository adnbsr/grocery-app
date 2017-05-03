import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native'
import TextField from 'react-native-md-textinput'
import Button from '../components/Button'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/constants'
import {IconsLoaded, IconsMap} from '../utils/icons'
import Parse from 'parse/react-native'
import {logIn} from '../actions'
import {connect} from 'react-redux'

class Login extends Component {


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
            password: undefined
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
                           label={"Username"}
                           value={this.state.username}
                           highlightColor={COLOR_PRIMARY}
                           inputStyle={styles.input}
                           autoCorrect={false}
                           autoCapitalize={'none'}
                           onChangeText={(text) => this.setState({username: text})}/>

                <TextField multiline={false}
                           label={"Password"}
                           value={this.state.password}
                           inputStyle={styles.input}
                           highlightColor={COLOR_PRIMARY}
                           returnKeyType={'done'}
                           secureTextEntry={true}
                           onChangeText={(text) => this.setState({password: text})}/>

                <Button title="Login" onPress={() => this.onSubmitPress()} style={styles.submit}/>
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

        const {username, password} = this.state

        if (username === undefined || password === undefined) {
            this.sendAlert('Username or Password is wrong!')
            return
        }

        if (password !== undefined && password.length < 6){
            this.sendAlert("Password must be at least 6 characters")
            return
        }

        this.props.dispatch(logIn(this.state.username, this.state.password))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
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

export default connect()(Login)