import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const Input = props => (

    <View>
        <TextInput style={{...styles.img, ...props.style}} source={require('../src/img/Doddge.jpg')}/>
    </View>
);
const styles = StyleSheet.create({
    img: {
        flex:1,
        height: 100,
        width: 155,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,

    }
});
export default Input;
