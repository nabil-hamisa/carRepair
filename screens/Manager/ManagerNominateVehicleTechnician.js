import React from 'react';
import {View, StyleSheet, ScrollView, Text, StatusBar, FlatList, Picker} from 'react-native';
import Header from '../../component/Header';
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';
import DateTimePicker from '@react-native-community/datetimepicker';
import validate from '../../src/utility/validation';
import DefqultInput from '../../component/DefaultInput';
import {connect} from 'react-redux';
import {searchCar, addSheet, addTask, getMechanicians} from '../../src/Actions';
import {Dialog} from 'react-native-simple-dialogs';
import VButton from '../../component/VButton';


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
                taskName: {
                    touched: false,
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 1,
                        maxLength: 20,
                    },
                },
                price: {
                    touched: false,
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 1,
                        maxLength: 20,
                    },
                },
                startDate: {
                    touched: false,
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 1,

                    },
                },
            },
            loading: false,
            carLoading: false,
            isReported: false,
            badReport: false,
            isLoadingSheet: false,
            isLoadingTask: false,
            carId: '',
            showReportSheet: false,
            reportSheetValue: '',
            showReportTask: false,
            reportTaskValue: '',

            item: {
                sheets: [],
            },

            allMechanician: [],
            selectedMechanicianID: '',
            selectedMechanician: '',
            doneSelectMechanician: false,

            selectedSheetID: '',
            selectedSheet: '',
            doneSelectSheet: false,

            show: false,
            dateT: '',
            date: new Date(),
            mode: 'date',
        };

        this.searchCar = this.search.bind(this);
        this.addSheet = this.addsheets.bind(this);
        this.addTask=this.addTasks.bind(this)
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
            this.updateInputState('startDate', this.state.date.toString());

        }
    };


    async sheetChange(itemIndex, itemValue) {
        let a = itemIndex;
        let b = itemValue;
        await this.setState({
            selectedSheetID: a,
            selectedSheet: b,
            doneSelectSheet: true,
        });
    }

    async mechanicianChange(itemIndex, itemValue) {
        let a = itemIndex;
        let b = itemValue;
        await this.setState({
            selectedMechanicianID: a,
            selectedMechanician: b,
            doneSelectMechanician: true,
        });
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

    async componentDidMount(): void {
        let index = 1;
        await this.props.getMechanicians({index});
        console.log(this.props.mechanicians);
        this.setState({allMechanician: this.props.mechanicians.mechanicians});
        console.log(this.state.allMechanician);

    }

    async search() {

        let str = this.state.controls.cin.value;
        console.log(str);

        this.setState({loading: true});
        await this.props.searchCar({str});
        await this.setState({loading: false});
        console.log(this.props.carFound);
    }

    async addsheets(item) {
        let car = item.id;
        this.setState({isLoadingSheet: true});
        console.log(car);
        this.setState({carId: car});
        await this.props.addSheet({car});
        this.setState({isLoadingSheet: false});
        if (this.props.successS) {
            this.setState({
                    showReportSheet: true,
                    reportSheetValue: 'Succes SheeT Added !',
                },
            );
            this.search();
        } else {
            this.setState({

                showReportSheet: true,
                reportSheetValue: 'Sheet Add Failed Try Again!',
            });
        }
    }

    async showTask(item) {
        await this.setState({
            showReportTask: true,
            item: item,
        });
        console.log(this.state.item.sheets);
    }

    async addTasks() {
        let price=0;
        let name = this.state.controls.taskName.value;
        let startDate = new Date(this.state.controls.startDate.value);
        try {
             price =parseFloat( this.state.controls.price.value);
        }catch (e) {

        }

        let sheet = this.state.selectedSheetID;
        let mechanician = this.state.selectedMechanicianID;
        this.setState({
            isLoadingTask:true
        })
        console.log(name, startDate, price, sheet, mechanician);

        await this.props.addTask({name, startDate, price, sheet, mechanician})
        if(this.props.successT){
            this.setState({
                badReport:false,
                isLoadingTask:false,
                showReportTask: true,
                reportTaskValue: 'Succes Task Has been Added !',
            })
            this.search()
        }else if(this.props.errorT){
            this.setState({
                isLoadingTask:false,
                badReport:true,
                showReportTask: true,
                reportTaskValue: 'Error you Happend !',
            })
        }


    }

    renderItem = ({item}) => {

        return (<Card style={styles.itemClient}>
            <View key={item.id} style={{flex: 1}}>

                <Text>Client</Text>
                <Text style={styles.label}>First Name : <Text
                    style={styles.labelValue}>{item.client.firstName}</Text></Text>
                <Text style={styles.label}>Last Name : <Text
                    style={styles.labelValue}>{item.client.lastName}</Text></Text>
                <Text style={styles.label}>Cin : <Text style={styles.labelValue}>{item.client.cin}</Text></Text>
                <Text>Car</Text>
                <Text style={styles.label}>Brand : <Text style={styles.labelValue}>{item.model.brand.name}</Text></Text>
                <Text style={styles.label}>Model : <Text style={styles.labelValue}>{item.model.name}</Text></Text>
                <Text style={styles.label}>Car Plate : <Text style={styles.labelValue}>{item.number}</Text></Text>
                <Text>Sheets</Text>
                {


                    item.sheets.map(({id, date, tasks, bill}, i) => (
                        <View key={i} style={styles.sheetsStyle}>
                            <Text style={styles.label}>Sheet {i}</Text>
                            <Text style={styles.label}>Sheet ID: <Text style={styles.labelValue}>{id}</Text></Text>
                            <Text style={styles.label}>Bill: <Text style={styles.labelValue}>{bill}$</Text></Text>
                            <View>
                                {tasks.map(({name, startDate, endDate, pieces, mechanician}, j) => (
                                    <View key={j} style={{
                                        backgroundColor: '#2f2f2f',
                                        padding: 20,
                                        borderBottomWidth: 5,
                                        borderBottomColor: '#fd8228',
                                    }}>
                                        <Text style={styles.label}>Task {j}</Text>
                                        <Text style={styles.label}>Name : <Text style={styles.labelValue}>{name}</Text></Text>
                                        <Text style={styles.label}>Start Date : <Text
                                            style={styles.labelValue}>{startDate}</Text></Text>
                                        <Text style={styles.label}>End Date : <Text
                                            style={styles.labelValue}>{endDate}</Text></Text>
                                        <Text style={styles.label}>Ordered Pices :</Text>
                                        <View>
                                            {pieces.map(({name, price}, k) => (
                                                <View key={k}>
                                                    <Text style={styles.label}>Pice{k}</Text>
                                                    <Text style={styles.label}>Name : <Text
                                                        style={styles.labelValue}>{name}</Text></Text>
                                                    <Text style={styles.label}>Price : <Text
                                                        style={styles.labelValue}>{price}</Text></Text>

                                                </View>
                                            ))}
                                        </View>

                                        <Text style={styles.label}>Mechanician Nominated for this task :</Text>
                                        <View>
                                            <Text style={styles.label}>First Name : <Text
                                                style={styles.labelValue}>{mechanician.firstName}</Text></Text>
                                            <Text style={styles.label}>Last Name : <Text
                                                style={styles.labelValue}>{mechanician.lastName}</Text></Text>

                                        </View>


                                    </View>
                                ))}
                            </View>
                        </View>
                    ))
                }
                <View style={styles.allbutons}>
                    <ButtonSmall
                        disabled={this.state.isLoadingSheet}
                        onPress={() => {
                            this.addsheets(item);
                        }}
                        style={styles.submitButton}>
                        {!this.state.isLoadingSheet && <Text>Add Sheet</Text>}
                        {this.state.isLoadingSheet && <Text>Loading...</Text>}
                    </ButtonSmall>

                    <ButtonSmall
                        onPress={() => {
                            this.showTask(item);
                        }}
                        style={styles.submitButton}>
                        <Text>Add Task</Text>
                    </ButtonSmall>
                </View>
            </View>
        </Card>);
    };


    listEmptyComponent = () => {
        return (
            <Card style={{flex: 1}}>
                <Text style={styles.label}>No Car Found !</Text>
            </Card>
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
                <Header title='Nominate TECH'/>
                <View>
                    <Card>
                        <View style={styles.form}>
                            <Text style={styles.textStyle}>Search Car By (Cin,Name,Plate Number) :</Text>
                            <DefqultInput
                                placeholder="Cin Here"
                                value={this.state.controls.cin.value}
                                onChangeText={(val) => this.updateInputState('cin', val)}
                                valid={this.state.controls.cin.valid}
                                touched={this.state.controls.cin.touched}
                            />
                            <ButtonSmall
                                onPress={this.searchCar}
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
                        contentContainerStyle={{paddingBottom: 300}}

                        data={this.props.carFound}
                        ListEmptyComponent={this.listEmptyComponent}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </Card>
                <Dialog

                    rounded={true}
                    visible={this.state.showReportSheet}
                    title="Result Add Sheet :"
                    titleStyle={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}
                    onTouchOutside={() => {
                        this.setState({showReportSheet: false});
                    }}>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}>{this.state.reportSheetValue}</Text>
                </Dialog>
                <Dialog

                    rounded={true}
                    visible={this.state.showReportTask}
                    title="ADD Task :"
                    titleStyle={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}
                    onTouchOutside={() => {
                        this.setState({showReportTask: false});
                    }}>

                    <Text style={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}>Task Name :</Text>
                    <DefqultInput style={styles.inputstyle}
                                  placeholder="Task Name here"
                                  value={this.state.controls.taskName.value}
                                  onChangeText={(val) => this.updateInputState('taskName', val)}
                                  valid={this.state.controls.taskName.valid}
                                  touched={this.state.controls.taskName.touched}
                    />
                    <Text style={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}>Task Price :</Text>
                    <DefqultInput style={styles.inputstyle}
                                  placeholder="Price here"
                                  value={this.state.controls.price.value}
                                  keyboardType="numeric"
                                  onChangeText={(val) => this.updateInputState('price', val)}
                                  valid={this.state.controls.price.valid}
                                  touched={this.state.controls.price.touched}
                    />
                    <Text style={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}>Add Task To sheet :</Text>
                    <Picker
                        selectedValue={this.state.selectedSheetID}
                        onValueChange={(itemIndex, itemValue) => this.sheetChange(itemIndex, itemValue)}>
                        <Picker.Item key={0} label="-Select sheet-" value={0}/>

                        {

                            this.state.item.sheets.map(({id}, i) => (
                                <Picker.Item key={id} label={i + ') ' + id} value={id}/>
                            ))
                        }

                    </Picker>
                    <Text style={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}>Add Technician To Task :</Text>
                    <Picker
                        selectedValue={this.state.selectedMechanicianID}
                        onValueChange={(itemIndex, itemValue) => this.mechanicianChange(itemIndex, itemValue)}>
                        <Picker.Item key={0} label="-Select Mechanician-" value={0}/>

                        {

                            this.state.allMechanician.map(({id, firstName, lastName}, j) => (
                                <Picker.Item key={id} label={j + ') ' + firstName + ' ' + lastName} value={id}/>
                            ))
                        }

                    </Picker>

                    <Text style={{
                        color: 'black',
                        fontFamily: 'hemi head bd it',
                    }}>Start date :</Text>
                    <VButton
                        style={styles.styleDate}
                        touched={this.state.controls.startDate.touched}
                        valid={this.state.controls.startDate.valid}
                        onPress={this.datepicker}> Pick a
                        Date </VButton>

                    {show && <DateTimePicker
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={this.setDate}/>

                    }


                    <ButtonSmall
                        onPress={this.addTasks.bind(this)}
                        disabled={
                            !this.state.controls.taskName.valid ||
                            !this.state.controls.price.valid ||
                            !this.state.doneSelectSheet ||
                            !this.state.doneSelectMechanician ||
                            !this.state.controls.startDate.valid ||
                            this.state.isLoadingTask

                        }

                        style={styles.submitButton}>
                        {this.state.isLoadingTask && <Text>Loading...</Text>}
                        {!this.state.isLoadingTask && <Text>Add Task</Text>}
                    </ButtonSmall>
                   {    !this.state.badReport&&
                       this.state.showReportTask&&<Text style={{
                        color: 'green',
                        fontFamily: 'hemi head bd it',
                    }}>{this.state.reportTaskValue}</Text>}
                    {    this.state.badReport&&
                    this.state.showReportTask&&<Text style={{
                        color: 'red',
                        fontFamily: 'hemi head bd it',
                    }}>{this.state.reportTaskValue}</Text>}
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
        flex: 2,
        margin: 20,

    }, textStyle: {
        marginRight: 10,
        marginLeft: 10,
        width: '100%',
        fontFamily: 'hemi head bd it',
        color: 'white',

    }, label: {
        margin: 5,
        paddingBottom: 5,
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
        backgroundColor: 'grey',
        marginBottom: 10,

    }, sheetsStyle: {
        borderRadius: 25,
        backgroundColor: '#585858',
    }, allbutons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
const mapStateToProps = state => ({
    errorS: state.errors.addSheet,
    me: state.me,
    carFound: state.carFound,
    successS: state.success.addSheet,
    mechanicians: state.mechanicians,
    successT:state.success.addTask,
    errorT: state.errors.addTask,

});
const mapDispatchToProps = (dispatch) => ({
    searchCar: (payload) => dispatch(searchCar((payload))),
    addSheet: (payload) => dispatch(addSheet(payload)),
    addTask: (payload) => dispatch(addTask(payload)),
    getMechanicians: (payload) => dispatch(getMechanicians(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cars);
