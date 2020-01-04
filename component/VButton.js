import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const VButton = props => {
    return (
        <TouchableOpacity  activeOpacity={0.6} onPress={props.onPress}>
            <View {...props}
                  style={[styles.button,props.style,props.touched && !props.valid  ? styles.invalid :null]}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        backgroundColor: "#999999",
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth: 5,
        marginRight: 10,
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: 'black',
        fontFamily: 'hemi head bd it',
        fontSize: 18,
        textAlign: 'center',
    },invalid: {
        borderRadius: 8,
        backgroundColor: "#f9c0c0",
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth: 5,
        marginRight: 10,
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
    }
});

export default VButton;
