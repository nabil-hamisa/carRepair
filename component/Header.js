import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconButton from './IconButton';

import Icon from 'react-native-vector-icons/FontAwesome5';


const Header = props => {
    return (
        <View style={{...styles.back, ...props.back}}>
            <View style={{...styles.header, ...props.header}}>
                <Text style={styles.headerTitle}>{props.title}</Text>
            </View>
        </View>
    );
};
let raduis = 70;
const styles = StyleSheet.create({
    back: {
        height: '10%',
        backgroundColor: '#000000',
    }
    ,
    header: {
        flex: 1,
        width: '100%',
        height: '30%',
        paddingTop: 10,
        backgroundColor: '#fd8228',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: raduis,
        borderBottomLeftRadius: raduis,
    },
    headerTitle: {
        fontFamily: 'Dodgv2i',
        color: 'white',
        fontSize: 20,
        textAlign: 'left'
    }
});

export default Header;
