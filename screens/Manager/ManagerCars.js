import React from 'react';
import {View, StyleSheet, ScrollView, Text, StatusBar, FlatList, Picker} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';
import DateTimePicker from '@react-native-community/datetimepicker';
import validate from '../../src/utility/validation';
import DefqultInput from '../../component/DefaultInput';
import {connect} from 'react-redux';
import {addCar, getBrands, getModelsByBrand, searchClient} from '../../src/Actions';
import {Dialog} from 'react-native-simple-dialogs';


class Cars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                cin: {
                    touched: false,
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 1,
                        maxLength: 20,
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
            loading: false,
            showAddCar: false,
            brands: [],
            selectBrandId: '',
            selectedBrand: '',
            showModel: false,
            selectedModelID: '',
            selectedModel: '',
            selectedClientId: '',
            models: [],
            carLoading: false,
            isReported:false,
            badReport:false


    };

        this.searchClient = this.search.bind(this);
        this.addCar = this.addCars.bind(this);
    }

    async componentDidMount(): void {
        await this.props.getBrands();
        this.setState({brands: this.props.brands});

    }

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

    async search() {

        let str = this.state.controls.cin.value;
        console.log(str, this.props.errors);

        this.setState({loading: true});
        await this.props.searchClient({str});
        await this.setState({loading: false});
        console.log(this.props.clientFound);
    }


    selectClient(item) {
        this.setState({
            showAddCar: true,
            selectedClientId: item.id,
        });
        console.log(item.id);
    }

    async addCars() {
        this.setState({
            carLoading: true,
            isReported:false,

        });
        let model = this.state.selectedModelID;
        let number = this.state.controls.carNumber.value;
        let client = this.state.selectedClientId;
        console.log(model, number, client);
        await this.props.addCar({model, number, client});


        if(this.props.success){
            this.setState({
                carLoading: false,
                isReported:true,
                badReport:false,
            });
        }else if(this.props.error){
            this.setState({
                carLoading: false,
                isReported:true,
                badReport:true,

            });
        }
    }


    renderItem = ({item}) => {
        let dob = new Date(item.dob).toLocaleDateString();
        return (<Card style={styles.itemClient}>
            <View style={{flex: 1}}>
                <Text style={styles.label}>First Name : <Text style={styles.labelValue}>{item.firstName}</Text></Text>
                <Text style={styles.label}>Last Name :<Text style={styles.labelValue}>{item.lastName}</Text></Text>
                <Text style={styles.label}>Cin :<Text style={styles.labelValue}>{item.cin}</Text></Text>
                <Text style={styles.label}>BirthDate :<Text style={styles.labelValue}>{dob}</Text></Text>
                <ButtonSmall
                    onPress={() => {
                        this.selectClient(item);
                    }}
                    style={styles.submitButton}>
                    <Text>Add Car</Text>
                </ButtonSmall>
            </View>
        </Card>);
    };


    listEmptyComponent = () => {
        return (
            <Card style={{flex: 1}}>
                <Text style={styles.label}>No Client Found !</Text>
            </Card>
        );
    };

    render(props) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#fd8228"
                    barStyle="light-content"
                />
                <Header title='Add Car'/>
                <View>
                    <Card>
                        <View style={styles.form}>
                            <Text style={styles.textStyle}>Client Cin(lastName,firstName):</Text>
                            <DefqultInput
                                placeholder="Cin Here"
                                value={this.state.controls.cin.value}
                                onChangeText={(val) => this.updateInputState('cin', val)}
                                valid={this.state.controls.cin.valid}
                                touched={this.state.controls.cin.touched}
                            />
                            <ButtonSmall
                                onPress={this.searchClient}
                                disabled={!this.state.controls.cin.valid ||
                                this.state.loading}
                                style={styles.submitButton}>

                                {!this.state.loading && <Text>Search</Text>}
                                {this.state.loading && <Text>Searching...</Text>}
                            </ButtonSmall>
                        </View>
                        <View>

                        </View>
                    </Card>


                </View>
                <Card styles={{flex: 1}}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 300}}
                        data={this.props.clientFound}
                        ListEmptyComponent={this.listEmptyComponent}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </Card>
                <Dialog

                    rounded={true}
                    visible={this.state.showAddCar}
                    title="Car Details"
                    titleStyle={{color: 'black',
                        fontFamily: 'hemi head bd it',}}
                    onTouchOutside={() => {
                        this.setState({showAddCar: false});
                    }}>
                    <View>
                        <Text style={{
                            color: 'black',
                            fontFamily: 'hemi head bd it',
                        }}>Brand :</Text>
                        <Picker
                            selectedValue={this.state.selectedBrandId}
                            onValueChange={(itemIndex, itemValue) => this.brandChange(itemIndex, itemValue)}>
                            <Picker.Item key={0} label="-Select Car Brand-" value={0}/>
                            {
                                this.state.brands.map((v) => {
                                    return <Picker.Item color='orange'  key={v.name} label={v.name} value={v.id}/>;
                                })

                            }


                        </Picker>


                        <Text style={{
                            color: 'black',
                            fontFamily: 'hemi head bd it',
                        }}>Car Model :</Text>
                        <Picker  enabled={this.state.showModel}

                                selectedValue={this.state.selectedModelID}
                                onValueChange={(itemIndex, itemValue) => this.modelChange(itemIndex, itemValue)}
                        >
                            <Picker.Item key={0} label="-Select Car model-" value={0}/>
                            {
                                this.state.models.map((v) => {
                                    return <Picker.Item color='orange' key={v.name} label={v.name} value={v.id}/>;
                                })

                            }

                        </Picker>
                        <Text
                            style={
                                {
                                    color: 'black',
                                    fontFamily: 'hemi head bd it',
                                }}>Car Plate :</Text>
                        <DefqultInput style={styles.inputstyle}
                                      placeholder="Client Car Plate"
                                      value={this.state.controls.carNumber.value}
                                      onChangeText={(val) => this.updateInputState('carNumber', val)}
                                      valid={this.state.controls.carNumber.valid}
                                      touched={this.state.controls.carNumber.touched}
                        />
                        {this.state.isReported&&this.state.badReport&&<Text style={{color:'red'}}>Car Plate Already exist !</Text>}
                        <ButtonSmall
                            disabled={
                                !this.state.controls.carNumber.valid ||
                                !this.state.doneSelect ||
                                this.state.carLoading
                            }

                            onPress={this.addCars.bind(this)}
                            style={styles.submitButton}>
                            {!this.state.carLoading && <Text>Add Car</Text>}
                            {this.state.carLoading && <Text>Loading</Text>}
                        </ButtonSmall>
                        {this.state.isReported&&!this.state.badReport&&<Text style={{color:'green'}}>Succes this Car has been Added</Text>}

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
        flex: 1,
        margin: 5,
    }, textStyle: {
        marginRight: 10,
        marginLeft: 10,
        width: '100%',
        fontFamily: 'hemi head bd it',
        color: 'white',

    }, label: {
        margin: 5,
        flex: 1,
        color: '#fd8228',
        fontFamily: 'hemi head bd it',
        marginLeft: '3%',
    }, labelValue: {
        flex: 1,
        color: 'white',
    }, img: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',

    }, itemClient: {
        backgroundColor: '#a6a6a6',
        marginBottom: 10,

    },
});
const mapStateToProps = state => ({
    error: state.errors.addCar,
    loggedIn: state.loggedIn,
    isManager: state.isManager,
    loadsLogin: state.loads.login,
    me: state.me,
    clientFound: state.clientFound,
    brands: state.brands,
    models: state.models,
    success: state.success.addCar,
});
const mapDispatchToProps = (dispatch) => ({
    searchClient: (payload) => dispatch(searchClient(payload)),
    addCar: (payload) => dispatch(addCar(payload)),
    getBrands: () => dispatch(getBrands()),
    getModelsByBrand: (payload) => dispatch(getModelsByBrand(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cars);
