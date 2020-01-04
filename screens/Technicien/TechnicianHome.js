import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Header from '../../component/Header';
class TechnicianHome extends React.Component{
    render(){
    return(
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#fd8228"
                barStyle="light-content"
            />
            <Header title='Home'/>
        </View>
    );
    }
};
const styles=StyleSheet.create({
    container:{
        backgroundColor: '#000000',
        flex: 1,
    }
});
export default TechnicianHome;

