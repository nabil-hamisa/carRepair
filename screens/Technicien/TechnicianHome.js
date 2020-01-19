import {View, ScrollView, FlatList, StatusBar, StyleSheet, RefreshControl, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import CircleText from '../../component/CircleText';
import {connect} from 'react-redux';
import {getStats} from '../../src/Actions';

class ManagerHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.stats,
            isLoading: false,
            stats: {},
        };

    }
    componentDidMount(): void {
        console.log(this.props.me,this.props.token)
    }

    render(props) {
        return (
            <View style={styles.container}>
                <Header title='HOME'/>
                <StatusBar
                    backgroundColor="#fd8228"
                    barStyle="light-content"
                />
                <View style={styles.status}>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.getStats}
                            title="Loading..."
                        />
                    }>

                    </ScrollView>


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
    stats: state.stats,
    errors: state.errors,
    token:state.token
});
const mapDispatchToProps = dispatch => ({

    getStats: () => dispatch(getStats()),

});
export default connect(mapStateToProps, mapDispatchToProps)(ManagerHome);

