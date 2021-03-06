/**
 * Created by adnanbasar on 04/05/2017.
 *
 * @flow
 */

import React from 'react'
import {View, Text, StyleSheet, Alert, PermissionsAndroid, Platform} from 'react-native'
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps'
import {COLOR_WHITE, COLOR_PRIMARY} from '../utils/colors'
import {connect} from 'react-redux'
import {updateUserAddress} from '../actions'
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../utils'
import strings from '../utils/strings'

import type {Region, Point} from '../types'

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT
const INITIAL_LATITUDE = 37.78825
const INITIAL_LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const INITIAL_REGION: Region = {
    latitude: INITIAL_LATITUDE,
    longitude: INITIAL_LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
}

class MapHelper extends React.Component {

    static navigatorStyle = {
        navBarBackgroundColor: COLOR_PRIMARY,
        navBarTextColor: COLOR_WHITE,
        navBarButtonColor: COLOR_WHITE,
        statusBarColor: COLOR_PRIMARY
    }

    state: {
        region: Region,
        point: Point
    }

    map: any = undefined

    constructor(props) {
        super(props)

        this.state = {
            point: {
                latitude: INITIAL_LATITUDE,
                longitude: INITIAL_LONGITUDE,
            }, region: INITIAL_REGION
        }
    }

    componentDidMount() {
        requestLocation()
        navigator.geolocation.getCurrentPosition((position) => {

            const {coords} = position
            const {latitude, longitude} = coords

            this.setState({
                point: {
                    latitude: latitude,
                    longitude: longitude
                },
                region: {
                    ...this.state.region,
                    latitude: latitude,
                    longitude: longitude
                }
            })

            this.map.animateToRegion(this.state.region)

        }, (error) => {
            console.warn(error)
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
    }

    render() {

        const provider = Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE

        return (
            <View style={styles.container}>
                <MapView
                    provider={provider}
                    ref={ref => {
                        this.map = ref
                    }}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    userLocationAnnotationTitle={"You"}
                    style={styles.map}
                    onRegionChange={this.onRegionChange.bind(this)}>

                    <MapView.Marker
                        coordinate={this.state.point}
                        onDragEnd={(e) => this.setState({point: e.nativeEvent.coordinate})}
                        draggable/>
                </MapView>
                <Text style={styles.useButton} onPress={() => this.onUseThisLocation()}>{strings.useLocation}</Text>

            </View>
        )
    }

    onRegionChange(region) {
        this.setState({
            region: region
        })
    }

    onUseThisLocation() {

        (async () => {

            try {
                const response = await fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.point.latitude},${this.state.point.longitude}&sensor=true`)
                const data = await response.json()

                const address = data.results[0].formatted_address

                Alert.alert( strings.addressFound,
                    address,
                    [{
                        text: strings.cancel, onDismiss: () => {

                        }
                    }, {
                        text: strings.useThis, onPress: () => {
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

async function requestLocation() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: strings.appName,
            message: strings.locationNeeded
        })

        if (granted) {
            console.log('granted')
        }else {
            console.log('not granted!')
        }

    } catch (error) {
        console.log(error)
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