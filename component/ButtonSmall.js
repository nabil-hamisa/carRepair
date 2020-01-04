import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TouchableNativeFeedback } from 'react-native';


const ButtonSmall = props => {
    const content= (

            <View style={[styles.button,props.disabled ? styles.disabled:null ]}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>

);


if (props.disabled){
    return content;

}if (Platform.OS === "android") {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            {content}
        </TouchableNativeFeedback>
    );
}  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
    button: {
        marginTop:20,
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
    },disabled:{
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        backgroundColor:'#eee',
        color:'#aaa',
        borderColor:'#aaa'
    }
});

export default ButtonSmall;
