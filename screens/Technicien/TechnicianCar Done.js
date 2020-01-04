import React from 'react';
import {View,StyleSheet}from 'react-native';
import Header from '../../component/Header';
class doneCar extends React.Component{
    render(){
    return(
        <View style={styles.container}>
            <Header title='Car Repaired'/>
        </View>
    );}
};
const styles=StyleSheet.create({
    container:{
        backgroundColor: '#000000',
        flex: 1,

    }
});
export default doneCar;
