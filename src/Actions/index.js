import ApolloClient, {cache} from '../ApolloClient';
import * as C from '../Consts';
import * as GQL from '../Consts/GraphQL';

const initRegister = () => ({type: C.REGISTER});
const registerSuccess = payload => ({type: C.REGISTER_SUCCESS, payload});
const registerError = payload => ({type: C.REGISTER_ERROR, payload});
const initLogin = () => ({type: C.LOGIN});
const loginSuccess = payload => ({type: C.LOGIN_SUCCESS, payload});
const loginError = payload => ({type: C.LOGIN_ERROR, payload});
const initGetStats = () => ({type: C.STATS});
const getStatsSuccess = payload => ({type: C.STATS_SUCCESS, payload});
const getStatsError = payload => ({type: C.STATS_ERROR, payload});

export const logout = () => ({type: C.LOGOUT});
export const register = payload => async dispatch => {
    dispatch(initRegister());
    try {
        await cache.reset();
        let data = (await ApolloClient().mutate({
            mutation: GQL.REGISTER,
            variables: payload,
        })).data.register;
        dispatch(registerSuccess({...data, me: {...data.me, role: true}}));
    } catch (e) {
        console.log(e.networkError.result.errors);
        e.graphQLErrors.map(({message}) => console.log('---' + message));
        let errorNumber = parseInt(e.message.replace('GraphQL error: ', ''));
        dispatch(registerError(errorNumber));
    }
};
export const login = payload => async dispatch => {
    dispatch(initLogin());
    try {
        const {username, password, isManager} = payload;
        await cache.reset();
        let login = isManager ? (await ApolloClient().query({
            query: GQL.MANAGER_LOGIN,
            variables: {username, password},
        })).data.managerLogin : (await ApolloClient().query({
            query: GQL.MECHANICIAN_LOGIN,
            variables: {username, password},
        })).data.mechanicianLogin;
        dispatch(loginSuccess({token: login.token, me: {...login.me, role: isManager}}));
    } catch (e) {
        let errorNumber = parseInt(e.message.replace('GraphQL error: ', ''));
        dispatch(loginError(errorNumber));
    }
};
export const getStats = () => async dispatch => {
    dispatch(initGetStats());
    try {
        let data = (await ApolloClient().query({
            query: GQL.GET_STATS,
        })).data.stats;
        dispatch(getStatsSuccess(data));
    } catch (e) {
        let errorNumber = parseInt(e.message.replace('GraphQL error: ', ''));
        dispatch(getStatsError(errorNumber));
    }
};
export const clearRegisterErrors = () => ({type: C.CLEAR_REGISTER_ERRORS});
export const clearLoginErrors = () => ({type: C.CLEAR_LOGIN_ERRORS});


