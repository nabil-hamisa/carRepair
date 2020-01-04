import React, {Component} from 'react';
import {View, StyleSheet, Text, Switch, StatusBar, TextInput, Image, ScrollView} from 'react-native';
import Header from '../../component/Header';
import ButtonSmall from '../../component/ButtonSmall.js';
import Card from '../../component/Card';
import DefqultInput from '../../component/DefaultInput';
import validate from '../../src/utility/validation';
import gql from 'graphql-tag';


const LOGIN_M = gql`
    query ManagerLogin($username:String!,$password:String!){
        managerLogin(data:{username:$username,password:$password}){token,
            me{id,
                firstName,
                lastName,
                username,
                dob,
                language
            }
        }
    }
`;

;
const LOGIN_MEC = gql`
        query ManagerLogin($username:String!,$password:String!){
          managerLogin(data:{username:$username,password:$password}){token,
              me{id,
                 firstName,
                 lastName,
                 username,
                 dob,
                 language
                 }
               }
             }
              `;

class Authentication extends React.Component {

    state = {
        controls: {
            userName: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    minLength: 5,
                    maxLength: 20,
                },
            },
            firstName: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    minLength: 2,
                    maxLength: 20,
                },
            },
            lastName: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    minLength: 2,
                    maxLength: 20,
                },
            },
            password: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    minLength: 5,
                    maxLength: 20,

                },
            },
            birthdate: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    minAge: 18,
                },
            },
        },
        dateT: '',
        date: new Date(),
        mode: 'date',
        show: false,
        dateValid: false,
        loading: false,
        isReported: false,
        reportValue: '',
        badReport: false,
        goodReport: false,
    };

    manSwitch = (value) => {
        this.setState({isManager: value});
    };

    updateInputState = (key, value) => {
        this.setState(prevState => {

            return {
                controls: {

                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules),
                        touched: true,
                    },

                },
            };
        });

    };




    /*    if (this.state.isManager) {
            this.props.navigation.navigate('manager');
        } else {
            this.props.navigation.navigate('tech');
        }*/


    render(props) {
        return (

            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#fd8228"
                    barStyle="light-content"
                />
                <Header title='Login'/>
                <ScrollView>
                    <View>
                        <Image style={styles.imageStyle}
                               source={require('../../assets/icons/Car-Repair-icon.png')}/>

                        <Card>
                            <View style={styles.form}>

                                <Text style={styles.textStyle}>UserName :</Text>
                                <DefqultInput
                                    placeholder="Your Username"
                                    value={this.state.controls.userName.value}
                                    onChangeText={(val) => this.updateInputState('userName', val)}
                                    valid={this.state.controls.userName.valid}
                                    touched={this.state.controls.userName.touched}
                                />
                                <Text style={styles.textStyle}>Password :</Text>
                                <DefqultInput
                                    placeholder="Your Password"
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)}
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touched}
                                    secureTextEntry={true}
                                />

                                <Card style={styles.toggleCardStyle}>
                                    <Text style={styles.toggleTextStyle}>Login As Manager </Text>
                                    <Switch

                                        value={this.state.isManager}
                                        onValueChange={this.manSwitch}
                                        thumbColor='#fd8228'
                                        trackColor={{true: 'rgba(179,96,30,0.98)', false: '#3c3c3c'}}
                                    />
                                </Card>
                                <ButtonSmall
                                    disabled={
                                        !this.state.controls.userName.valid ||
                                        !this.state.controls.password.valid ||
                                        this.state.loading

                                    }
                                    onPress={()=>{  }}
                                    style={styles.submitButton}>
                                    {this.state.loading && <Text>Loading...</Text>}
                                    {!this.state.loading && <Text>LOG IN</Text>}</ButtonSmall>

                            </View>
                        </Card>
                    </View>
                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',

    }, form: {
        flex: 1,
        flexDirection: 'column',
    }, submitButton: {
        margin: 10,
    }, textStyle: {
        marginRight: 10,
        marginLeft: 10,
        width: '100%',
        fontFamily: 'hemi head bd it',
        color: 'white',

    }, imageStyle: {
        width: 250,
        height: 225,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

    }, toggleCardStyle: {
        backgroundColor: '#999999',
        margin: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth: 5,
    }, toggleTextStyle: {
        marginRight: 10,
        marginLeft: 10,
        width: '100%',
        fontFamily: 'hemi head bd it',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
    ,

});


export default Authentication;



