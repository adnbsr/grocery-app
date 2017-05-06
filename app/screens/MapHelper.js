/**
 * Created by adnanbasar on 04/05/2017.
 */

import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {COLOR_WHITE, COLOR_PRIMARY} from '../utils/constants'
import {connect} from 'react-redux'
import {updateUserAddress} from '../actions'

class MapHelper extends React.Component {

    static navigatorStyle = {
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE,
        statusBarColor: COLOR_PRIMARY
    }

    constructor(props) {
        super(props)

        this.state = {
            region: {
                latitude: 40.8273277,
                longitude: 29.3557592,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            point: {
                latitude: 40.8273277,
                longitude: 29.3557592
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.region}
                    style={styles.map}
                    onRegionChange={(region) => this.onRegionChange(region)}>

                    <MapView.Marker
                        coordinate={this.state.point}
                        onDragEnd={(e) => this.setState({point: e.nativeEvent.coordinate})}
                        draggable/>
                </MapView>
                <Text style={styles.useButton} onPress={() => this.onUseThisLocation()}>USE THIS LOCATION</Text>

            </View>
        )
    }

    onRegionChange(region: Object) {

    }

    onUseThisLocation() {

        (async () => {

            try {
                const response = await fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.point.latitude},${this.state.point.longitude}&sensor=true`)
                const data = await response.json()

                const address = data.results[0].formatted_address

                Alert.alert("Address Found",
                    address,
                    [{
                        text: 'Cancel', onDismiss: () => {

                        }
                    }, {
                        text: "Use This", onPress: () => {
                            this.props.dispatch(updateUserAddress(address))
                            this.props.navigator.popToRoot({
                                animated: true
                            });
                        }
                    }]
                )

            } catch (e) {
                console.error(e)
            }
        })()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'stretch'
    },
    map: {
        flexGrow: 1
    },
    useButton: {
        height: 56,
        fontSize: 20,
        fontWeight: '500',
        padding: 16,
        backgroundColor: '#424242',
        textAlign: 'center',
        color: COLOR_WHITE
    }
})

export default connect()(MapHelper)