import {View, ScrollView, FlatList, StatusBar, StyleSheet, RefreshControl, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import CircleText from '../../component/CircleText';
import {connect} from 'react-redux';
import {getStats} from '../../src/Actions';

class ManagerHome extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
            items: [{title: 'mechanicians', value: this.props.stats.mechanicians?this.props.stats.mechanicians.toString():'0'},
                {title: 'cars', value: this.props.stats.cars?this.props.stats.cars.toString():'1'}, {
                title: 'clients',
                value: this.props.stats.clients?this.props.stats.clients.toString():'0',
            }, {title: 'income', value: this.props.stats.income?this.props.stats.income.toString():'0'}],
            isLoading: false,
        }

    }

    getData= async () => {
        await this.props.getStats();



    };

     componentDidMount(): void {

        this.props.getStats();
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(prevProps.stats !== this.props.stats)
            this.setState({
                items: [{title: 'mechanicians', value: this.props.stats.mechanicians},
                    {title: 'cars', value: this.props.stats.cars}, {
                        title: 'clients',
                        value: this.props.stats.clients,
                    }, {title: 'income', value: this.props.stats.income}]
            })
     }

    renderStatus = ({item}) => {
        return (
            <View style={styles.cirleses}>
                <CircleText title={item.title} value={item.value}/>
            </View>
        );
    };

    render(props) {
        return (
            <View style={styles.container}>
                <Header title='HOME'/>
                <View style={styles.status}>
                    <FlatList
                        data={this.state.items}
                        renderItem={this.renderStatus}
                        refreshing={this.state.isLoading}
                        onRefresh={this.getData}
                        numColumns={2}
                    />


                </View>

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

    },
});
const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    isManager: state.isManager,
    me: state.me,
    stats:state.stats,
});
const mapDispatchToProps = dispatch => ({

    getStats: () => dispatch(getStats()),

});
export default connect(mapStateToProps,mapDispatchToProps)(ManagerHome);

