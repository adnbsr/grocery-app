/**
 * Created by adnanbasar on 06/05/2017.
 */

import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
import {MD_GREY_300, MD_DEEP_ORANGE_900} from '../utils/colors'

class DeliveryPicker extends React.Component{

    props: {
        type: string,
        onDeliverySelected: (type: string) => any
    }

    static propTypes = {
        type: React.PropTypes.string.isRequired
    }

    render(){

        return (
            <View style={styles.container}>
                <Text style={this.getStyle(this.props.type === STANDARD)} onPress={() => this.onChangeType(STANDARD)}>Standard</Text>
                <Text>I</Text>
                <Text style={this.getStyle(this.props.type === EXPRESS)} onPress={() => this.onChangeType(EXPRESS)}>Express</Text>
            </View>
        )
    }

    onChangeType(selectedType: string){
        this.props.onDeliverySelected(selectedType)
    }

    getStyle(isSelected: boolean): Object{
        if (isSelected) {
            return [styles.item &&  {fontWeight: '600', fontSize: 16, color: MD_DEEP_ORANGE_900}]
        }

        return [styles.item]
    }

}

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        backgroundColor: MD_GREY_300,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 64,
        paddingRight: 64
    },
    item: {
        fontWeight: '300',
        fontSize: 12
    }
})

export const STANDARD = 'standard'
export const EXPRESS = 'express'

export default DeliveryPicker