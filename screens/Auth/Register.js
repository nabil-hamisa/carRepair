import React from 'react';
import {View, StyleSheet, ScrollView, Text, StatusBar} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';
import DateTimePicker from '@react-native-community/datetimepicker';
import validate from '../../src/utility/validation';
import DefqultInput from '../../component/DefaultInput';
import VButton from '../../component/VButton';
import {Dialog} from 'react-native-simple-dialogs';
import {connect} from 'react-redux';
import {register, clearRegisterErrors} from '../../src/Actions';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.register = this.register.bind(this);
    }

    componentDidMount(): void {
        if (this.props.loggedIn && this.props.me.role) {
            this.props.navigation.navigate('manager');
        } else if (this.props.loggedIn && !this.props.me.role) {
            this.props.navigation.navigate('tech');
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
    setDate = (event, date) => {
        if (date == undefined) {
            this.state.date;
        } else {
            this.state.date = date;
            this.setState({
                    show: Platform.OS === 'ios' ? true : false,
                    date,
                    dateValid: true,
                    dateT: date.toLocaleString(),
                },
            );
            this.updateInputState('birthdate', this.state.date.toString());

        }
    };
    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    };
    datepicker = () => {
        this.show('date');
    };


    async register() {
        let date = new Date(this.state.controls.birthdate.value);
        let username = this.state.controls.userName.value.toString();
        let firstName = this.state.controls.firstName.value.toString();
        let lastName = this.state.controls.lastName.value.toString();
        let password = this.state.controls.password.value.toString();
        let repassword=password
        let language = 'en';
        let dob=date;
        console.log(username,firstName,lastName,password,repassword,language,date);
        await this.props.register({username,firstName,lastName,password,dob,language,});
        console.log(this.props.error);

        if (this.props.loggedIn && this.props.me.role) {
            this.props.navigation.navigate('manager');
        } else if (this.props.loggedIn && !this.props.me.role) {
            this.props.navigation.navigate('tech');
        }
        console.log(this.props.loggedIn)
        this.setState({
            loading: false,
        });


    };

    render(props) {

        const {show, date, mode} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#fd8228"
                    barStyle="light-content"
                />
                <Header title='Register'/>
                <View style={styles.loginContainer}>
                    <ScrollView>
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
                                <Text style={styles.textStyle}>FirstName :</Text>
                                <DefqultInput
                                    placeholder="Your First Name"
                                    value={this.state.controls.firstName.value}
                                    onChangeText={(val) => this.updateInputState('firstName', val)}
                                    valid={this.state.controls.firstName.valid}
                                    touched={this.state.controls.firstName.touched}

                                />

                                <Text style={styles.textStyle}>LastName :</Text>
                                <DefqultInput
                                    placeholder="Your Last Name"
                                    value={this.state.controls.lastName.value}
                                    onChangeText={(val) => this.updateInputState('lastName', val)}
                                    valid={this.state.controls.lastName.valid}
                                    touched={this.state.controls.lastName.touched}
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

                                <Text style={styles.textStyle}>BirthDate :</Text>
                                <VButton
                                    style={styles.styleDate}
                                    touched={this.state.controls.birthdate.touched}
                                    valid={this.state.controls.birthdate.valid}
                                    onPress={this.datepicker}> Pick a
                                    Date +18 </VButton>
                                {show && <DateTimePicker
                                    value={date}
                                    mode={mode}
                                    display="default"
                                    onChange={this.setDate}/>

                                }{
                            }{
                            }
                                <ButtonSmall
                                    onPress={this.register}
                                    disabled={
                                        !this.state.controls.userName.valid ||
                                        !this.state.controls.birthdate.valid ||
                                        !this.state.controls.password.valid ||
                                        !this.state.controls.lastName.valid ||
                                        !this.state.controls.firstName.valid ||
                                        this.state.loading

                                    }

                                    style={styles.submitButton}>
                                    {this.state.loading && <Text>Loading...</Text>}
                                    {!this.state.loading && <Text>register</Text>}
                                </ButtonSmall>
                            </View>
                        </Card>
                    </ScrollView>
                </View>
                <Dialog
                    rounded={true}
                    visible={this.state.isReported}
                    title="Result"
                    onTouchOutside={this.submit}>
                    <View>
                        <Text>{this.state.reportValue}</Text>
                    </View>
                </Dialog>
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

    }, styleDate: {

        marginRight: 10,
        marginLeft: 10,
    },

});
const mapStateToProps = state => ({
    error: state.errors,
    loggedIn: state.loggedIn,
    isManager: state.isManager,
    loadsLogin: state.loads.login,
    me: state.me,

});
const mapDispatchToProps = (dispatch) => ({
    clearRegisterErrors: () => dispatch(clearRegisterErrors()),
    register: (payload) => dispatch(register(payload)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Register);
