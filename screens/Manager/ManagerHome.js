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
            items: [{title: 'title1', value: '0'}, {title: 'title2', value: '1'}, {
                title: 'title1',
                value: '0',
            }, {title: 'title1', value: '0'}],
            isLoading: false,
        }

    }

    getData= async () => {
        console.log(this.props.stats)
        await this.props.getStats();
        console.log(this.props.stats)



    };

     componentDidMount(): void {


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

