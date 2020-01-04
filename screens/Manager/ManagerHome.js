import {View, FlatList, StatusBar, StyleSheet,ActivityIndicator,RefreshControl, Text} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import CircleText from '../../component/CircleText';
import ButtonSmall from '../../component/ButtonSmall';

class ManagerHome extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            isloading:true,
            apiload:false,
            refreshing: true

        };
    }

    onRefresh() {
        //Clear old data of the list
        this.setState({ dataSource: [] });
        //Call the Service to get the latest data
        this.componentDidMount();
    }


    renderItem({item}) {
            return (
                <View>
                    <View style={styles.cirleses}>
                        <CircleText title="Cars Repaired" value={item.done}/>
                        <CircleText title="Cars In Progress" value={item.prog}/>
                    </View>

                    <View style={styles.cirleses}>
                        <CircleText title="Cars WaitList" value={item.wait}/>
                        <CircleText title="Total Technician" value={item.Ttech}/>

                    </View>
                    <View style={styles.cirleses}>
                        <CircleText title="Nominated Tech" value={item.Ntech}/>
                        <CircleText title="Available Tech" value={item.Atech}/>
                    </View>
                </View>);
        }



    componentDidMount() {
        const url = 'http://192.168.1.5/carRepair/api/post/read.php';
        fetch(url,{method:"POST",'Content-Type': 'application/json', timeout:1} )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.dashboard,
                    isloading: false,
                    apiload:true,
                    refreshing: false,
                });
            })
            .catch((error) => {
                this.setState({
                    apiload: false,
                    isloading:false
                });
                this.render();
                console.log(error);
            });

    }


    render() {
        console.log('isloading '+this.state.isloading);
        console.log('api load'+this.state.apiload);
        console.log('--------------------');
        if(this.state.isloading== true &&  this.state.apiload==false){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#fd8228" />
                </View>
            );
        }else if(this.state.isloading==false && this.state.apiload==false) {
            return (
                <View style={styles.container }>
                    <StatusBar
                        backgroundColor="#fd8228"
                        barStyle="light-content"
                    />
                    <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                    <CircleText style={{ alignSelf:'center',justifyContent: 'center',alignItems:'center'}} title="Connection Failed" value="404"/>
                        <ButtonSmall  >Refresh</ButtonSmall>
                    </View>
                </View>
            );



        }else if (this.state.isloading==false && this.state.apiload==true) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#fd8228"
                        barStyle="light-content"
                    />
                    <Header title='HOME'/>
                    <FlatList data={this.state.dataSource} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()}  refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    } />
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,

    }, cirleses: {
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 5,

    },
});
export default ManagerHome;
