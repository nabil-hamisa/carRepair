import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Header from '../../component/Header';
import {connect} from 'react-redux';
import { logout} from '../../src/Actions';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.disconnect = this.disconnect.bind(this);

    }

    disconnect() {
        console.log(this.props.me)
         this.props.logout();
         this.props.navigation.navigate('Auth');
    }

    render(props) {
        return (
            <View>
                <Header title="Profile"/>
                <View style={styles.container}>
                    <View style={styles.header}></View>

                    <Image style={styles.avatar} source={require('../../src/img/avatar6.png')}/>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{this.props.me.username}</Text>
                            <Text style={styles.name}>{this.props.me.firstName} {this.props.me.lastName}</Text>
                            <Text style={styles.info}>{new Date(this.props.me.dob).toLocaleDateString()}</Text>
                            <TouchableOpacity onPress={this.disconnect} style={styles.buttonContainer}>
                                <Text>Disconnect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({


    header: {
        backgroundColor: '#000000',
        height: 200,
        borderBottomWidth: 5,
        borderBottomColor: '#fd8228',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130,
        borderColor: '#fd8228',
    },

    body: {
        marginTop: 40,

    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: '#3c3c3c',
        fontWeight: '600',
    },
    info: {
        fontSize: 16,
        color: '#3c3c3c',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: '#3c3c3c',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: '#fd8228',
    },
});

const mapStateToProps = state => ({
    error: state.errors.login,
    loggedIn: state.loggedIn,
    isManager: state.isManager,
    loadsLogin: state.loads.login,
    me: state.me,
});
const mapDispatchToProps = dispatch=>({

    logout:()=>dispatch(logout())
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);



