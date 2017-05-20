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
import {connect} from 'react-redux'

class Account extends React.Component {

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY,
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE
    }

    state: {
        password: string,
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

    render() {
        return (
            <View style={styles.container}>

                <TextField multiline={false}
                           label={strings.name}
                           value={this.state.name}
                           highlightColor={COLOR_PRIMARY}
                           inputStyle={styles.input}
                           autoCorrect={false}
                           autoCapitalize={'none'}
                           onChangeText={(text) => this.setState({name: text})}/>

                <TextField multiline={false}
                           label={strings.phone}
                           value={this.state.phone}
                           inputStyle={styles.input}
                           highlightColor={COLOR_PRIMARY}
                           keyboardType={'phone-pad'}
                           maxLength={10}
                           onChangeText={(text) => this.setState({phone: text})}/>

                <TextField multiline={false}
                           label={strings.address}
                           value={this.state.address}
                           inputStyle={styles.input}
                           autoCapitalize={'none'}
                           autoCorrect={false}
                           highlightColor={COLOR_PRIMARY}
                           returnKeyType={'done'}
                           onChangeText={(text) => this.setState({address: text})}/>

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
        console.log(this.state)
    }

    dismissLocaleBox(){
        this.props.navigator.dismissLightBox()
        SnackBar.show({
            title: strings.localeUpdate,
            length: SnackBar.LENGTH_SHORT
        })
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
    input: {
        height: 36,
        lineHeight: 36,
        margin: 8,
        padding: 8
    },
    save: {
        marginTop: 16,
        margin: 8

    }
})

function mapStateToProps(state) {
    return {user: state.user}
}

export default connect(mapStateToProps)(Account)
