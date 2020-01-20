import React, {Component} from 'react';
import {View, StyleSheet, Text, Switch, StatusBar, Image, ScrollView} from 'react-native';
import Header from '../../component/Header';
import ButtonSmall from '../../component/ButtonSmall.js';
import Card from '../../component/Card';
import DefqultInput from '../../component/DefaultInput';
import validate from '../../src/utility/validation';
import {connect} from 'react-redux';
import {clearLoginErrors, login} from '../../src/Actions';
import {Dialog} from 'react-native-simple-dialogs';
class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                userName: {
                    touched: false,
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 5,
                        maxLength: 20,
                    },
                }, password: {
                    touched: false,
                    value: '',
                    valid: true,
                    validationRules: {
                        minLength: 5,
                        maxLength: 20,

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
            badReport:false,
        }

        this.login = this.login.bind(this);
    }

    manSwitch = (value) => {
        this.setState({isManager: value});
        if(!this.state.isManager){
           this.state.controls.userName.value="admins";
            this.state.controls.password.value="admins";
        }else{
            this.state.controls.userName.value="teste";
            this.state.controls.password.value="teste";

        }
    };
    componentDidMount(): void {

        if(this.props.loggedIn&& this.props.me.role){
            this.props.navigation.navigate('manager');
        }  if(this.props.loggedIn&& !this.props.me.role){
            this.props.navigation.navigate('tech');
        }

    }
    async login() {

        const username = this.state.controls.userName.value;
        const password = this.state.controls.password.value;
        const {isManager} = this.state;
        await this.props.login(username, password, isManager);

        if (this.props.loggedIn && this.props.me.role) {
            this.props.navigation.navigate('manager');
        }else if(this.props.loggedIn&& !this.props.me.role){
            this.props.navigation.navigate('tech');
        }
        if (this.props.errors != null) {
            if(this.props.errors==6 ||this.props.errors==7)
            this.setState({
                isReported:true,
                badReport:true,
                ReportedValue:'invalide Username or Password'
            })
            else{
                this.setState({
                    isReported:true,
                    badReport:true,
                    ReportedValue:'Error Occurred May  you try again Later'
                })
            }
        }



    }

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

    render(props){
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
                                        this.props.loadsLogin

                                    }
                                    onPress={this.login}
                                    style={styles.submitButton}>
                                    { this.props.loadsLogin && <Text>Loading...</Text>}
                                    {! this.props.loadsLogin && <Text>LOG IN</Text>}</ButtonSmall>
                                <Dialog
                                    rounded={true}
                                    visible={this.state.isReported}
                                    title="Result"
                                    onTouchOutside={()=>{
                                        this.setState({isReported:false})
                                    }}>

                                    <View>
                                        {this.state.badReport&& <Text style={{
                                            color: 'red',
                                            fontFamily: 'hemi head bd it',
                                        }}>{this.state.ReportedValue}</Text>}
                                        {!this.state.badReport&& <Text style={{
                                            color: 'green',
                                            fontFamily: 'hemi head bd it',
                                        }}>{this.state.ReportedValue}</Text>}
                                    </View>
                                </Dialog>
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

const mapStateToProps = state =>({
    errors:state.errors.login,
    loggedIn:state.loggedIn,
    isManager:state.isManager,
    loadsLogin:state.loads.login,
    data: state.data,
    loads: state.loads,
    stats:state.stats,
    me:state.me
});
const mapDispatchToProps = dispatch=>({
    clearLoginErrors:()=>dispatch(clearLoginErrors()),
    login:(username,password,isManager)=>dispatch(login({username,password,isManager}))
});

export default connect(mapStateToProps,mapDispatchToProps)(Authentication);



