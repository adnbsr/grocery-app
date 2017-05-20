/**
 * Created by adnanbasar on 20/05/2017.
 */


import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import CompatListView from '../components/CompatListView'
import LocaleItem from '../components/LocaleItem'
import LocaleManager from '../utils/LocaleManager'
import strings from '../utils/strings'
import {COLOR_PRIMARY} from '../utils/colors'

import type {LocaleType} from '../types'

const data: Array<LocaleType> = [
    {label: strings.english, locale: 'en', icon: require('../img/en.png')},
    {label: strings.turkmen, locale: 'tm', icon: require('../img/tm.png')},
    {label: strings.russian, locale: 'ru', icon: require('../img/ru.png')}
]


class LocaleBox extends React.Component {

    static navigatorStyle = {
        statusBarColor: COLOR_PRIMARY
    }

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={() => this.props.onClose()}>{strings.localeChoose}</Text>
                <CompatListView data={data} renderRow={this.renderRow.bind(this)}/>
            </View>
        )
    }

    renderRow(locale) {
        return (
            <LocaleItem locale={locale} onSelect={(selected) => {
                LocaleManager.setLocale(selected.locale)
                this.props.onClose()
            }}/>
        )
    }

}

const styles = {

    container: {
        width: Dimensions.get('window').width * 0.7,
        //height: Dimensions.get('window').height * 0.3,
        backgroundColor: '#ffffff',
        padding: 16
    }
}


export default LocaleBox