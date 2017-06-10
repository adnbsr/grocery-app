/**
 * Created by adnanbasar on 30/04/2017.
 *
 * @flow
 */

import React from 'react'
import {View, StyleSheet, Text, Platform, Picker} from 'react-native'
import Button from '../components/Button'
import TextField from 'react-native-md-textinput'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'
import {IconsMap, IconsLoaded} from '../utils/icons'
import strings from '../utils/strings'
import SnackBar from 'react-native-snackbar'
import {updateUser} from '../actions'
import {connect} from 'react-redux'

class Account extends React.Component {

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY,
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE
    }

    state: {
        name: string,
        address: string,
        phone: string
    }

    constructor(props) {
        super(props)

        const {user} = props

        this.state = {
            name: user.name,
            address: user.address,
            phone: user.phone
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount(){
        IconsLoaded.then(() => {
            this.props.navigator.setButtons({
                rightButtons: [{
                    id: 'chooseLocale',
                    disableIconTint: true,
                    icon: IconsMap['globe']
                }],
                animated: true
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            SnackBar.show({
                title: "New Profile is saved. Thanks"
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextField multiline={false}
                           label={strings.name}
                           value={this.state.name}
                           highlightColor={COLOR_PRIMARY}
                           inputStyle={styles.textInput}
                           autoCorrect={false}
                           autoCapitalize={'none'}
                           onChangeText={(text) => this.setState({name: text})}/>

                <TextField multiline={false}
                           label={strings.phone}
                           value={this.state.phone}
                           inputStyle={styles.textInput}
                           highlightColor={COLOR_PRIMARY}
                           keyboardType={'phone-pad'}
                           maxLength={8}
                           onChangeText={(text) => this.setState({phone: text})}/>

                <TextField multiline={true}
                           label={strings.address}
                           value={this.state.address}
                           inputStyle={styles.addressInput}
                           autoCapitalize={'none'}
                           autoCorrect={false}
                           highlightColor={COLOR_PRIMARY}
                           returnKeyType={'done'}
                           onChangeText={(text) => this.setState({address: text})}
                           wrapperStyle={{minHeight: 96}}
                />

                <Button title={strings.save} onPress={this.onSaveUser.bind(this)} style={styles.save}/>
            </View>
        );
    }

    onNavigatorEvent(event){

        if (event.id === 'chooseLocale'){
            this.props.navigator.showLightBox({
                screen: 'sepetim.LocaleBox',
                passProps: {
                    onClose: this.dismissLocaleBox.bind(this)
                },
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }
            })
        }
    }

    onSaveUser() {

        const username = this.state.phone
        const {name, address} = this.state

        //Todo: Textleri strings'e tasi

        if (username === undefined || username.length !== 8) {
            SnackBar.show({
                title: "Phone cannot be empty or less than 8 digits"
            })
            return
        }

        if (name === undefined || name.length === 0) {
            SnackBar.show({
                title: "Name cannot be empty"
            })
            return
        }

        if (address === undefined || address.length === 0) {
            SnackBar.show({
                title: "Address cannot be empty"
            })
            return
        }

        this.props.dispatch(updateUser(
            {
                username,
                name,
                address
            }
        ))
    }

    dismissLocaleBox(){
        SnackBar.show({
            title: strings.localeUpdate,
            length: SnackBar.LENGTH_SHORT
        })
        this.props.navigator.dismissLightBox()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLOR_WHITE,
        alignItems: 'stretch',
        padding: 16
    },
    textInput: {
        minHeight: 36,
        lineHeight: 36,
        margin: 8,
        padding: 8
    },
    addressInput: {
        minHeight: 72,
        lineHeight: 72,
        margin: 8,
        padding: 8
    },
    save: {
        marginTop: 32
    }
})

function mapStateToProps(state) {
    return {user: state.user}
}

export default connect(mapStateToProps)(Account)
