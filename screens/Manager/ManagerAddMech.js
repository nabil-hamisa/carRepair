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
import {register, clearRegisterErrors, addMechanician} from '../../src/Actions';


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

        };
        this.addMechanician = this.register.bind(this);
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


        let dob = date;
        this.setState({
            loading: true,
        });
        await this.props.addMechanician({username, firstName, lastName, password, dob});
        console.log(this.props.errors,this.props.success);
        if (this.props.errors == 8) {
            await this.setState({
                badReport:true,
                loading: false,
                isReported: true,
                reportValue: 'Error Username Already Exists',
            });
        }
        if (this.props.errors == 13) {
            this.setState({
                badReport:true,
                loading: false,
                isReported: true,
                reportValue: 'Error Your Age under 18',
            });
        }

        if (this.props.errors == 0) {
            this.setState({
                badReport:true,
                loading: false,
                isReported: true,
                reportValue: 'Error Occured in server',
            });
        }




        if (this.props.success) {
            await  this.setState({
                badReport:false,
                loading: false,
                isReported: true,
                reportValue: 'Succes Your Mechanician  Has been Added !',

            });

        }else if(this.props.errors){

        }


        this.setState({
            loading: false,
        });
    }

    render(props) {

        const {show, date, mode} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#fd8228"
                    barStyle="light-content"
                />
                <Header title='Add Mechanician'/>
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
                                    onPress={this.register.bind(this)}
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
                                    {!this.state.loading && <Text>Add Mechanician</Text>}
                                </ButtonSmall>
                            </View>
                        </Card>
                    </ScrollView>
                </View>
                <Dialog
                    rounded={true}
                    visible={this.state.isReported}
                    title="Result"
                    onTouchOutside={() => {
                        this.setState({isReported: false});
                    }}>
                    <View>
                       {this.state.badReport&& <Text style={{
                           color: 'red',
                           fontFamily: 'hemi head bd it',
                       }}>{this.state.reportValue}</Text>}
                       {!this.state.badReport&& <Text style={{
                           color: 'green',
                           fontFamily: 'hemi head bd it',
                       }}>{this.state.reportValue}</Text>}
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
    errors: state.errors.addMechanician,
    success: state.success.addMechanician,
    loggedIn: state.loggedIn,
    isManager: state.isManager,
    loadsLogin: state.loads.login,
    me: state.me,

});
const mapDispatchToProps = (dispatch) => ({
    clearRegisterErrors: () => dispatch(clearRegisterErrors()),
    register: (payload) => dispatch(register(payload)),
    addMechanician: (payload) => dispatch(addMechanician(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
