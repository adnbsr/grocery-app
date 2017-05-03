// @flow

import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

class SearchBarHolder extends React.Component {

    props: {
        search: (keyword: string) => any
    }

    static propTypes = {
        search: React.PropTypes.func.isRequired
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.barContainer}>
                    <MaterialIcon name="search" color="#BDBDBD" backgroundColor="#ffffff" size={24} iconStyle={styles.icon}/>
                    <TextInput
                        multiline={false}
                        placeholder={"Search"}
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        returnKeyType={"search"}
                        onSubmitEditing={(event) => {
                            this.props.search(event.nativeEvent.text)
                        }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: '#4cd762',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    barContainer: {
        flexDirection: 'row',
        height: 36,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 18,
        paddingLeft: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    icon: {
        margin: 6
    },
    input: {
        height: 36,
        alignSelf: 'stretch',
        flex: 1,

    }
})

export default SearchBarHolder
