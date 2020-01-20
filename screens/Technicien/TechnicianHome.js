import {View, ScrollView, FlatList, StatusBar, StyleSheet, RefreshControl, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../component/Header';

import {connect} from 'react-redux';
import {getTasks} from '../../src/Actions';
import Card from '../../component/Card';
import ButtonSmall from '../../component/ButtonSmall';

class ManagerHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.stats,
            isLoading: false,
            stats: {},
            isFetching:false,
        };
            this.getTasks=this.onRefresh.bind(this)
    }
   async onRefresh() {
       let index = 1;
        this.setState({ isFetching: true })
       await this.props.getTasks({index});
       this.setState({ isFetching: false })
    }

    async componentDidMount(): void {
        let index = 1;
        console.log(this.props.me, this.props.token);
        await this.props.getTasks({index});


    }

    renderItem = ({item}) => {
        let startDate = new Date(item.startDate).toLocaleDateString();
        let endDate = new Date(item.endDate).toLocaleDateString();

        return (
            <Card style={styles.itemClient}>
                <View style={{flex: 1}}>
                    <Text style={styles.label}>Task Name : <Text style={styles.labelValue}>{item.name}</Text></Text>
                    <Text style={styles.label}>Start Date :<Text style={styles.labelValue}>{startDate}</Text></Text>
                    <Text style={styles.label}>End Date :<Text style={styles.labelValue}>{item.endDate}</Text></Text>
                    <Text style={styles.label}>Price :<Text style={styles.labelValue}>{item.price}</Text></Text>

                </View>
            </Card>);
    };
    listEmptyComponent = () => {
        return (
            <Card style={{flex: 1}}>
                <Text style={styles.label}>You Have No Task !</Text>
            </Card>
        );
    };

    render(props) {
        return (
            <View style={styles.container}>
                <Header title='HOME'/>
                <StatusBar
                    backgroundColor="#fd8228"
                    barStyle="light-content"
                />

                <Text style={styles.headerStyle}>All Tasks</Text>
                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    contentContainerStyle={{paddingBottom: 300}}
                    data={this.props.tasks.tasks}
                    ListEmptyComponent={this.listEmptyComponent}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />


            </View>
        );

    }

}


const styles = StyleSheet.create({
    status: {
        alignItems: 'center',
        justifyContent: 'center',
    }
    , container: {
        backgroundColor: '#000000',
        flex: 1,


    }, cirleses: {
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 5,

    }, label: {
        margin: 5,
        flex: 1,
        color: '#fd8228',
        fontFamily: 'hemi head bd it',
        marginLeft: '3%',
    }, labelValue: {
        flex: 1,
        color: 'white',
    },
    itemClient: {
        backgroundColor: '#3b3b3b',
        marginBottom: 10,

    },headerStyle:{
        fontFamily: 'hemi head bd it',
        alignSelf:'center',
        color:"white",
        fontSize:50
    }
});
const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    isManager: state.isManager,
    me: state.me,
    stats: state.stats,
    errors: state.errors,
    token: state.token,
    tasks: state.tasks,
});
const mapDispatchToProps = dispatch => ({
    getTasks: (payload) => dispatch(getTasks(payload)),


});
export default connect(mapStateToProps, mapDispatchToProps)(ManagerHome);

