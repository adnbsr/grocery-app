import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native'
import TextField from 'react-native-md-textinput'
import SnackBar from 'react-native-snackbar'
import Button from '../components/Button'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
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

    state: {
        name: undefined,
        password: undefined,
        address: undefined,
        phone: undefined
    }

    constructor(props) {
        super(props)

        this.state = {
            name: undefined,
            password: undefined,
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
                           maxLength={8}
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

    sendAlert(message: string) {
        Alert.alert("Sebetim", message)
    }

    onSubmitPress() {

        const {name, password, phone, address} = this.state

        if (phone === undefined || phone.length < 8) {
            SnackBar.show({
                title: "Phone must be at least 8 characters"
            })
            return
        }

        const user = {
            username: phone,
            name,
            password,
            address
        }

        this.props.dispatch(signUp(user))
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