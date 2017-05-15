/**
 * Created by adnanbasar on 07/05/2017.
 */

import React from 'react'
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import {COLOR_PRIMARY, COLOR_WHITE} from '../utils/colors'

import Swiper from 'react-native-swiper';

class AppSwiper extends React.Component {

    props: {
        data: Array<Object>
    }

    static defaultProps = {
        data: [
            "https://www.bigbasket.com/media/customPage/355c27b8-a44f-4900-a390-8e82c69b8021/3861a4f7-5911-4562-80fc-ed59345eadef/c824d22c-c86c-4dc6-8558-2e0fc8badbcd/DT_560x378-1.jpg",
            "https://www.bigbasket.com/media/customPage/355c27b8-a44f-4900-a390-8e82c69b8021/3861a4f7-5911-4562-80fc-ed59345eadef/c824d22c-c86c-4dc6-8558-2e0fc8badbcd/DT_soyamilk_275x184_25TH_APRIL.jpg",
            "https://www.bigbasket.com/media/customPage/355c27b8-a44f-4900-a390-8e82c69b8021/3861a4f7-5911-4562-80fc-ed59345eadef/c824d22c-c86c-4dc6-8558-2e0fc8badbcd/Juices-275-X-184-1.jpg",
            "https://www.bigbasket.com/media/customPage/355c27b8-a44f-4900-a390-8e82c69b8021/3861a4f7-5911-4562-80fc-ed59345eadef/32ea79a1-bde2-44d1-9fca-1628c81a8af1/DT_spread_480x360_25TH_APRIL.jpg",
            "https://www.bigbasket.com/media/customPage/355c27b8-a44f-4900-a390-8e82c69b8021/3861a4f7-5911-4562-80fc-ed59345eadef/32ea79a1-bde2-44d1-9fca-1628c81a8af1/DT_Chocolates_480x360_25TH_APRIL.jpg",
            "https://www.bigbasket.com/media/customPage/355c27b8-a44f-4900-a390-8e82c69b8021/3861a4f7-5911-4562-80fc-ed59345eadef/6faa8834-1c45-40c0-a387-54d97caa2ab4/Curd-&-Lassi-480--360.jpg",
            "https://www.bigbasket.com/media/customPage/355c27b8-a44f-4900-a390-8e82c69b8021/3861a4f7-5911-4562-80fc-ed59345eadef/6faa8834-1c45-40c0-a387-54d97caa2ab4/DT_Organic-Staples_480x360_25TH_APRIL.jpg"
        ]
    }


    render() {


        return (
            <Swiper style={styles.wrapper}
                    showsButtons={false}
                    width={width}
                    height={height}
                    activeDotColor={COLOR_PRIMARY}
                    dotColor={COLOR_WHITE}
                    autoplay={true}>
                {this.props.data.map((item, index) => {
                    return (
                        <View style={styles.slide} key={index}>
                            <Image source={{uri: item}} style={{flex: 1}}/>
                        </View>
                    )
                })}

            </Swiper>
        )
    }
}

const width = Dimensions.get('window').width
const height = (width / 4 ) * 3


const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        alignItems: 'stretch'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default AppSwiper