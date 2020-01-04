import React from 'react';
import {View, ActivityIndicator, StyleSheet, ScrollView, Text, StatusBar, TextInput} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';
import DateTimePicker from '@react-native-community/datetimepicker';
import validate from '../../src/utility/validation';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import DefqultInput from '../../component/DefaultInput';
import VButton from '../../component/VButton';
import {Dialog} from 'react-native-simple-dialogs';


class Register extends React.Component {
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

    sumbmit = async () => {
        this.setState({loading: true, badReport: false, goodReport: false, reportValue: ''});
        console.log(this.state.controls.birthdate.value);
        let days = new Date(this.state.controls.birthdate.value).getDate();
        let month = new Date(this.state.controls.birthdate.value).getMonth();
        let year = new Date(this.state.controls.birthdate.value).getFullYear();
        let fulldate = year + '-' + month + '-' + days;
        let username = this.state.controls.userName.value.toString();
        let firstName = this.state.controls.firstName.value.toString();
        let lastName = this.state.controls.lastName.value.toString();
        let password = this.state.controls.password.value.toString();
        let language = 'en';
        console.log(fulldate);
        await this.props.register(
            username,
            firstName,
            lastName,
            fulldate,
            password,
            language,
        ).then(({data}) => {
            this.setState(
                {
                    loading: false,
                    isReported: true,
                    goodReport: true,
                    badReport: false,
                    reportValue: 'Your Account Has Been Created!',
                });
            console.log(data);
        }).catch(
            (e => {
                this.setState({loading: false, goodReport: false, badReport: true, isReported: true});
                e.graphQLErrors.map(({message}, i) => {
                    console.log(i, message);
                    if (message === '8') {
                        this.setState({
                            reportValue: 'UserName Already  Exist !',
                        });
                    } else {
                        this.setState({
                            reportValue: 'ERROR !',
                        });
                    }
                });
                console.log(e.graphQLErrors);
                console.log('-------------------------');
                console.log(e.networkError.result.errors);
            }),
        );

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
                                    onPress={this.sumbmit}
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
                    onTouchOutside={() => {
                        this.setState({isReported: false});
                        if (this.state.goodReport) {
                            this.props.navigation.navigate('Authentication');
                        }
                    }}>
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


    export default graphql(gql`
        mutation Register($username:String!,$firstName:String!,$lastName:String!,$password:String!,$dob:DateTime!,$language:String!){
            register(data:{
                username:$username,firstName:$firstName,lastName:$lastName,password:$password,dob:$dob,language:$language
            }){
                token,
                me{
                    id
                    firstName,
                    lastName,
                    username,
                    dob,
                    language
                }
            }
        }
`, {
        props: ({mutate}) => ({
            register: (username, firstName, lastName, dob, password, language) => mutate({
                variables: {
                    username,
                    firstName,
                    lastName,
                    dob,
                    password,
                    language,
                },
            }),
        }),
    },
)
(Register)
;
