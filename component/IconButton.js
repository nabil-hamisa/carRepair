import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Icon name={'sign-out-alt'} size={24}/>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor:'#fd8228',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8
    },
    buttonText: {
        color: 'black',
        fontFamily: 'hemi head bd it',
        fontSize: 18,
        textAlign: 'center',
    }
});

export default IconButton;
