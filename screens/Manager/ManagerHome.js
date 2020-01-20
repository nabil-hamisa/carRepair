import {View, ScrollView, FlatList, StatusBar, StyleSheet, RefreshControl, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import CircleText from '../../component/CircleText';
import {connect} from 'react-redux';
import {getStats} from '../../src/Actions';

class ManagerHome extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.stats,
            isLoading: false,
            stats: {},
        };
        this.getStats = this.getStats.bind(this);
    }

    async getStats() {
        console.log(this.props.me);
        console.log(this.props.stats);
        await this.props.getStats();
        console.log(this.props.stats);
        await this.setState({isLoading: false});
    };

    async componentDidMount(): void {
         this._isMounted = true;
         if (this._isMounted) {
            await this.props.getStats();
         }

    }
    componentWillUnmount() {
        this._isMounted = false;
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
                        <View style={styles.cirleses}>
                            <CircleText title="Mechanicians" value={this.props.stats.mechanicians}/>
                            <CircleText title="Client" value={this.props.stats.clients}/>
                        </View>
                        <View style={styles.cirleses}>
                            <CircleText title="Cars" value={this.props.stats.cars}/>
                            <CircleText style={{fontSize:1}} title="Income" value={this.props.stats.income}/>
                        </View>

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

