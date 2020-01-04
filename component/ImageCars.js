import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const ImagesCars = props => (
    <View>
        <Image style={{...styles.img, ...props.style}} source={require('../src/img/Doddge.jpg')}/>
    </View>
);
const styles = StyleSheet.create({
    img: {
        flex:1,
        height: 100,
        width:175,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,

    }
});
export default ImagesCars;
