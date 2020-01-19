import React from 'react';
import {View, StyleSheet, ScrollView, Text, Picker} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';
import PickImage from '../../component/PickImage';
import DateTimePicker from '@react-native-community/datetimepicker';
import VButton from '../../component/VButton';
import DefqultInput from '../../component/DefaultInput';
import validate from '../../src/utility/validation';
import {connect} from 'react-redux';
import {addClient, getBrands, getModelsByBrand} from '../../src/Actions';
import {Dialog} from 'react-native-simple-dialogs';

class AddCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
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
                birthdate: {
                    touched: false,
                    value: '',
                    valid: false,
                    validationRules: {
                        minAge: 18,
                    },
                }, cin: {
                    touched: false,
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 8,
                        maxLength: 8,
                    },

                }, carNumber: {
                    touched: false,
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 6,
                        maxLength: 25,
                    },
                },
            },
            dateT: '',
            date: new Date(),
            mode: 'date',
            show: false,
            dateValid: false,
            loading: false,
            brands: [],
            selectBrandId: '',
            selectedBrand: '',
            showModel: false,
            selectedModelID: '',
            selectedModel: '',
            models: [],
            doneSelect: false,
            reportedValue: '',
            isReported: false,

        };
        this.addClient = this.addClient.bind(this);
    }

    async componentDidMount(): void {
        await this.props.getBrands();
        this.setState({brands: this.props.brands});
    }

    async addClient() {

        console.log(this.props.client);
        this.setState({
                loading: true,
                ReportedValue: '',
            },
        );
        let firstName = this.state.controls.firstName.value.toString();
        let lastName = this.state.controls.lastName.value.toString();
        let dob = new Date(this.state.controls.birthdate.value);
        let cin = this.state.controls.cin.value.toString();
        let carNumber = this.state.controls.carNumber.value.toString();
        let carModel = this.state.selectedModelID.toString();
        await this.props.addClient({firstName, lastName, dob, cin, carNumber, carModel});
       await this.setState({loading: false});
        console.log('imo props error ' + this.props.errors);
        console.log('imo props succes ' + this.props.success);
        if (this.props.success == true) {
           await this.setState({
                isReported: true,
                ReportedValue: 'Succes Client Created',
            });

        } else if (this.props.errors == true) {
            await this.setState({
                isReported: true,
                ReportedValue: 'Error this Provided Cin or Plate Number  Already Exists',
            });
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
    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    };
    datepicker = () => {
        this.show('date');
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

    async brandChange(itemIndex, itemValue) {
        console.log('im passed to methode ' + itemIndex, itemValue);
        let a = itemIndex;
        let b = itemValue;
        await this.setState({
            showModel: false,
            selectedBrandId: a,
            selectedBrand: b,
        });
        console.log('im state ' + this.state.selectedBrand, this.state.selectedBrandId);
        let id = itemIndex;
        if (id != 0) {
            this.setState({showModel: true});
            console.log(this.state.selectedBrand, this.state.selectedBrandId);
            await this.props.getModelsByBrand({id});
            this.setState({models: this.props.models});
            console.log(this.state.models);
        } else {
            this.setState({showModel: false});
        }
    }

    async modelChange(itemIndex, itemValue) {
        let a = itemIndex;
        let b = itemValue;
        await this.setState({
            selectedModelID: a,
            selectedModel: b,
            doneSelect: true,
        });
        if (this.state.selectedModelID == 0) {
            await this.setState({doneSelect: false});
        }
        console.log(this.state.selectedModel, this.state.selectedModelID);
    }

    render(props) {


        const {show, date, mode} = this.state;
        return (
            <View style={styles.container}>
                <Header title='Add Client'/>

                <ScrollView>
                    <Card>
                        <View style={styles.Form}>
                            <Text style={styles.textStyle}>Cin :</Text>
                            <DefqultInput style={styles.inputstyle}
                                          placeholder="Your Cin"
                                          value={this.state.controls.cin.value}
                                          keyboardType="numeric"
                                          onChangeText={(val) => this.updateInputState('cin', val)}
                                          valid={this.state.controls.cin.valid}
                                          touched={this.state.controls.cin.touched}
                            />
                            <Text style={styles.textStyle}>First Name:</Text>
                            <DefqultInput style={styles.inputstyle}
                                          placeholder="Your Client first Name"
                                          value={this.state.controls.firstName.value}
                                          onChangeText={(val) => this.updateInputState('firstName', val)}
                                          valid={this.state.controls.firstName.valid}
                                          touched={this.state.controls.firstName.touched}
                            />
                            <Text style={styles.textStyle}>Last Name :</Text>
                            <DefqultInput style={styles.inputstyle}
                                          placeholder="Your Client Last Name"
                                          value={this.state.controls.lastName.value}
                                          onChangeText={(val) => this.updateInputState('lastName', val)}
                                          valid={this.state.controls.lastName.valid}
                                          touched={this.state.controls.lastName.touched}
                            />
                            <Text style={styles.textStyle}>Car Plate :</Text>
                            <DefqultInput style={styles.inputstyle}
                                          placeholder="Client Car Plate"
                                          value={this.state.controls.carNumber.value}
                                          onChangeText={(val) => this.updateInputState('carNumber', val)}
                                          valid={this.state.controls.carNumber.valid}
                                          touched={this.state.controls.carNumber.touched}
                            />
                            <Text style={styles.textStyle}>Car Brand :</Text>
                            <Picker
                                selectedValue={this.state.selectedBrandId}
                                onValueChange={(itemIndex, itemValue) => this.brandChange(itemIndex, itemValue)}>
                                <Picker.Item key={0} label="-Select Car Brand-" value={0}/>
                                {
                                    this.state.brands.map((v) => {
                                        return <Picker.Item key={v.name} label={v.name} value={v.id}/>;
                                    })

                                }


                            </Picker>


                            <Text style={styles.textStyle}>Car Model :</Text>
                            <Picker enabled={this.state.showModel}
                                    selectedValue={this.state.selectedModelID}
                                    onValueChange={(itemIndex, itemValue) => this.modelChange(itemIndex, itemValue)}
                            >
                                <Picker.Item key={0} label="-Select Car model-" value={0}/>
                                {
                                    this.state.models.map((v) => {
                                        return <Picker.Item key={v.name} label={v.name} value={v.id}/>;
                                    })

                                }

                            </Picker>


                            <Text style={styles.textStyle}>Date of Birth :</Text>
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

                            }
                            <Text style={styles.textStyle}>Car Photo :</Text>

                            <PickImage onImagePicked={this.imagePickedHandler}/>
                        </View>
                    </Card>
                    <ButtonSmall
                        onPress={this.addClient}
                        disabled={
                            !this.state.controls.carNumber.valid ||
                            !this.state.controls.cin.valid ||
                            !this.state.doneSelect ||
                            !this.state.controls.birthdate.valid ||
                            !this.state.controls.lastName.valid ||
                            !this.state.controls.firstName.valid ||
                            this.state.loading
                        }

                        style={styles.submitButton}>
                        {this.state.loading && <Text>Loading...</Text>}
                        {!this.state.loading && <Text>Create Client</Text>}
                    </ButtonSmall>
                </ScrollView>
                <Dialog
                    rounded={true}
                    visible={this.state.isReported}
                    title="Result"
                    onTouchOutside={() => {
                        this.setState({isReported: false});
                    }}>
                    <View>
                        <Text>{this.state.ReportedValue}</Text>
                    </View>
                </Dialog>
            </View>
        );
    }


};
const styles = StyleSheet.create({
    container: {

        backgroundColor: '#000000',
        flex: 1,
    }, Form: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,

    }, inputstyle: {
        borderRadius: 8,
        backgroundColor: '#999999',
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth: 5,
        marginRight: 10,
        marginLeft: 10,

    }, textStyle: {
        marginRight: 10,
        marginLeft: 10,
        width: '100%',
        fontFamily: 'hemi head bd it',
        color: 'white',

    }, photoStyle: {
        backgroundColor: '#999999',
        height: 200,
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth: 5,

    }, addphoto: {
        backgroundColor: '#999999',
        borderBottomColor: '#fd8228',
        borderBottomWidth: 2,
        borderLeftColor: '#fd8228',
        borderLeftWidth: 5,
    }, submitButton: {
        marginBottom: 20,
    },

});
const mapStateToProps = state => ({
    errors: state.errors.addClient,
    loggedIn: state.loggedIn,
    isManager: state.isManager,
    loadsLogin: state.loads.login,
    me: state.me,
    data: state.data,
    brands: state.brands,
    models: state.models,
    clients: state.clients,
    success: state.success.addClient,

});
const mapDispatchToProps = (dispatch) => ({
    getBrands: () => dispatch(getBrands()),
    getModelsByBrand: (payload) => dispatch(getModelsByBrand(payload)),
    addClient: (payload) => dispatch(addClient(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddCar);
