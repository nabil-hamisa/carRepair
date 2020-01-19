import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const CircleText = props => {
    return (

        <View style={styles.bigContainer}>
            <View>
                <Text style={styles.label}>{props.title}</Text>
            </View>
            <View style={{...styles.container, ...props.container}} >
                <Text style={styles.textStyle}>{props.value}</Text>
            </View>
        </View>

    );
};
let taille = 150;
let border = '#444444';
let borderWidth = 10;
let textColor = '#fd8228';
const styles = StyleSheet.create({
    container: {

        margin:5,
        width: taille,
        height: taille,
        borderRadius: taille / 2,
        borderColor: border,
        borderWidth: borderWidth,
        borderTopLeftRadius:0,
        borderTopRightRadius:50,
        borderBottomLeftRadius:75,
        borderBottomRightRadius:0,
        borderEndColor:'#fd8228',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily:'Monoton-Regular',
        color: textColor,
        fontSize: 30,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",




    },label:{
        fontSize:15,
        color:'white',
        fontFamily:'Facon',



    },bigContainer:{
        margin:'2%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CircleText;
