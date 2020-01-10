import {View, StyleSheet, ActivityIndicator, Text, Image, StatusBar} from 'react-native';
import React from 'react';


class AuthLoading extends React.Component {
    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    };
    async componentDidMount() {
        this.props.navigation.navigate('Auth');
    }



    render() {
            return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#fd8228"
                    barStyle="light-content"
                />
                <Image style={styles.imageStyle} source={require('../../assets/icons/Car-Repair-icon.png')}/>
                <Text style={styles.label}>Loading ...</Text>
                <ActivityIndicator size="large" color="#fd8228" />
            </View>)
        }
    }



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',

    }, label: {
      color:'#ffffff',
        fontFamily:'Facon',



    },
});
export default AuthLoading;
