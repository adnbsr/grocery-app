import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native'
import TextField from 'react-native-md-textinput'
import Button from '../components/Button'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import {IconsLoaded, IconsMap} from '../utils/icons'
import strings from '../utils/strings'
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

    state: {
        phone: string,
        password: string
    }

    constructor(props) {
        super(props)

        this.state = {
            phone: undefined,
            password: undefined
        }

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
                           label={strings.phone}
                           value={this.state.phone}
                           highlightColor={COLOR_PRIMARY}
                           inputStyle={styles.input}
                           autoCorrect={false}
                           autoCapitalize={'none'}
                           maxLength={8}
                           onChangeText={(text) => this.setState({phone: text})}/>

                <TextField multiline={false}
                           label={strings.password}
                           value={this.state.password}
                           inputStyle={styles.input}
                           highlightColor={COLOR_PRIMARY}
                           returnKeyType={'done'}
                           secureTextEntry={true}
                           onChangeText={(text) => this.setState({password: text})}/>

                <Button title={strings.login} onPress={this.onSubmitPress.bind(this)} style={styles.submit}/>
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
        Alert.alert(strings.appName, message)
    }

    onSubmitPress() {

        const {phone, password} = this.state

        if (phone === undefined || password === undefined) {
            this.sendAlert(strings.phonePasswordWrong)
            return
        }

        if (password !== undefined && password.length < 6){
            this.sendAlert(strings.password6Characters)
            return
        }

        this.props.dispatch(logIn(this.state.phone, this.state.password))
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