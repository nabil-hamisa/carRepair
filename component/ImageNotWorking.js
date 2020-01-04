import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const ImagesNotWorking = props => (
    <View>
        <Image style={{...styles.img, ...props.style}} source={require('../src/img/nowork.jpg')}/>
    </View>
);
const styles = StyleSheet.create({
    img: {
        flex:1,
        height: 150,
        width: 170,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,

    }
});
export default ImagesNotWorking;
