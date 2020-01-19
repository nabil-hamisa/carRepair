import ApolloClient, {cache, createClient} from '../ApolloClient';
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
const initAddClient=()=>({type:C.ADD_CLIENT});
const addClientSuccess=payload=>({type:C.ADD_CLIENT_SUCCESS,payload});
const addClientError=payload=>({type:C.ADD_CLIENT_ERROR,payload});
const initGetBrands=()=>({type:C.BRANDS});
const getBrandsSuccess=payload=>({type:C.BRANDS_SUCCESS,payload});
const getBrandsError=payload=>({type:C.BRANDS_ERROR,payload});
const initGetModelsByBrand=()=>({type:C.MODELS_BY_BRAND});
const getModelsByBrandSuccess=payload=>({type:C.MODELS_BY_BRAND_SUCCESS,payload});
const getModelsByBransError=payload=>({type:C.MODELS_BY_BRAND_ERROR,payload});
const initSearchClient=()=>({type:C.SEARCH_CLIENT});
const searchClientSuccess=(payload)=>({type:C.SEARCH_CLIENT_SUCCESS,payload});
const searchClientError=(payload)=>({type:C.SEARCH_CLIENT_ERROR,payload});
const initSearchCar=()=>({type:C.SEARCH_CAR});
const searchCarSuccess=(payload)=>({type:C.SEARCH_CAR_SUCCESS,payload});
const searchCarError=(payload)=>({type:C.SEARCH_CAR_ERROR,payload});
export const clearRegisterErrors = () => ({type: C.CLEAR_REGISTER_ERRORS});
export const clearLoginErrors = () => ({type: C.CLEAR_LOGIN_ERRORS});
export const clearStats=()=>({type:C.CLEAR_STATS})
const initAddCar=()=>({type:C.ADD_CAR});
const addCarSuccess=(payload)=>({type:C.ADD_CAR_SUCCESS,payload});
const addCarError=(payload)=>({type:C.ADD_CAR_ERROR,payload});
const initAddSheet=()=>({type:C.ADD_SHEET});
const addSheetSuccess=payload=>({type:C.ADD_SHEET_SUCCESS,payload});
const addSheetError=payload=>({type:C.ADD_SHEET_ERROR,payload});
export const logout = () => ({type: C.LOGOUT});
const initAddTask=()=>({type:C.ADD_TASK});
const addTaskSuccess=payload=>({type:C.ADD_TASK_SUCCESS,payload});
const addTaskError=payload=>({type:C.ADD_TASK_ERROR,payload});
const initGetMechanicians=()=>({type:C.MECHANICIANS});
const getMechaniciansSuccess=payload=>({type:C.MECHANICIANS_SUCCESS,payload});
const getMechaniciansError=payload=>({type:C.MECHANICIANS_ERROR,payload});
export const register = payload => async dispatch => {

    dispatch( clearRegisterErrors());
    dispatch(initRegister());
try {
        await cache.reset();
        let data = (await ApolloClient().mutate({
            mutation: GQL.REGISTER,
            variables: payload,
        })).data.register;
        dispatch(registerSuccess({...data, me: {...data.me, role: true}}));
        console.log(data);
    } catch (e) {
        console.log(e.message);
        let errorNumber = parseInt(e.message.replace('GraphQL error: ', ''));
        dispatch(registerError(errorNumber));
    }
};
export const login = payload => async dispatch => {
    dispatch(initLogin());
        const {username, password, isManager} = payload;
        await cache.reset();
        if(isManager){
            try {
            let login=(await ApolloClient().query({
                query: GQL.MANAGER_LOGIN,
                variables: {username, password},
            })).data.managerLogin;
            createClient(login.token);
            dispatch(loginSuccess({token: login.token, me: {...login.me, role: isManager}}));
            } catch (e) {
                let errorNumber = parseInt(e.message.replace('GraphQL error: ', ''));
                if (e.message==null){
                    errorNumber=0;
                }
                dispatch(loginError(errorNumber));
            }
        }else{
            try{
                let login = (await ApolloClient().query({
                    query: GQL.MECHANICIAN_LOGIN,
                    variables: {username, password},
                })).data.mechanicianLogin;
                dispatch(loginSuccess({token: login.token, me: {...login.me, role: isManager}}));
            } catch (e) {
                let errorNumber = parseInt(e.message.replace('GraphQL error: ', ''));
                dispatch(loginError(errorNumber));
            }

        }

};
export const getStats = () => async dispatch => {;
    dispatch(initGetStats());
    try {
        await cache.reset();
        let data = (await ApolloClient().query({
            query: GQL.GET_STATS,
        })).data.stats;
        dispatch(getStatsSuccess(data));
    } catch (e) {
        let errorNumber = parseInt(e.message.replace('GraphQL error: ', ''));
        dispatch(getStatsError(errorNumber));
    }
};
export const addClient=payload=>async dispatch=>{
    dispatch(initAddClient());
    try{
        console.log(payload);
        await cache.reset();
        let data = (await ApolloClient().mutate({
            mutation:GQL.ADD_CLIENT,
            variables:payload
        })).data.addClient;
        dispatch(addClientSuccess(data));
        console.log(data);

    }catch (e) {
        console.log("graph ql ---"+e.message);
        let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(addClientError(errorNumber));
    }
};
export const getBrands=payload=>async dispatch=>{
    dispatch(initGetBrands());
    try {
        await cache.reset();
        let data = (await ApolloClient().query({
            query:GQL.GET_BRANDS,
            variables:payload
        })).data.brands;
        dispatch(getBrandsSuccess(data));
    }catch (e) {
        let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(getBrandsError(errorNumber));
    }
};
export const getModelsByBrand=payload=>async dispatch=>{
    dispatch(initGetModelsByBrand());
    try{
        await cache.reset();
        let data = (await ApolloClient().query({
            query:GQL.GET_MODELS_BY_BRAND,
            variables:payload
        })).data.modelsByBrand;
        dispatch(getModelsByBrandSuccess(data));

    }catch (e) {

        let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(getModelsByBransError(errorNumber));
    }
};
export const searchClient=payload=>async dispatch=>{
    console.log(payload);
    dispatch(initSearchClient());
    try{
        await cache.reset();
        let data = (await ApolloClient().query({
            query:GQL.SEARCH_CLIENT,
            variables:payload
        })).data.searchClient;
        dispatch(searchClientSuccess(data))
        console.log(data);
    }catch (e) {
        console.error(e);
        let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(searchClientError(errorNumber));
    }
};
export const addCar=payload=>async dispatch=>{
    dispatch(initAddCar());
    try{
        console.log(payload)
        await cache.reset();
        let data = (await ApolloClient().mutate({
            mutation:GQL.ADD_CAR,
            variables:payload
        })).data.addCar;
        dispatch(addCarSuccess(data));
        console.log(data)

    }catch (e) {
         let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(addCarError(errorNumber));
    }
};


export const searchCar=payload=>async dispatch=>{
    console.log(payload);
    dispatch(initSearchCar());
    try{
        await cache.reset();
        let data = (await ApolloClient().query({
            query:GQL.SEARCH_CAR,
            variables:payload
        })).data.searchCar;
        dispatch(searchCarSuccess(data))
        console.log(data);
    }catch (e) {
        console.error(e);
        let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(searchCarError(errorNumber));
    }
};
export const addSheet=payload=>async dispatch=>{
    dispatch(initAddSheet());
    try{
        console.log(payload)
        await cache.reset();
        let data = (await ApolloClient().mutate({
            mutation:GQL.ADD_SHEET,
            variables:payload
        })).data.addSheet;
        dispatch(addSheetSuccess(data));
        console.log(data)
    }catch (e) {
        console.log(e);
        let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(addSheetError(errorNumber));
    }
}
export const addTask=payload=>async dispatch=>{
    dispatch(initAddTask());
    try{
        console.log(payload);
        let data = (await ApolloClient().mutate({
            mutation:GQL.ADD_TASK,
            variables:payload
        })).data.addTask;
        dispatch(addTaskSuccess(data));
        console.log(data);
    }catch (e) {
        console.log(e);
        let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
        dispatch(addTaskError(errorNumber));
    }
};
export const getMechanicians=payload=>async dispatch=>{
    dispatch(initGetMechanicians());
    try {
        await cache.reset();
        let data = (await ApolloClient().query({
            query:GQL.GET_MECHANICIANS,
            variables:payload
        })).data.mechanicians;
        dispatch(getMechaniciansSuccess(data));
    }catch (e) {
        if(payload.index === 1)
            dispatch(getMechaniciansSuccess({
                totalPages:0,
                mechanicians:[]
            }));
        else {
            let errorNumber = parseInt(e.message.replace("GraphQL error: ",""));
            dispatch(getMechaniciansError(errorNumber));
        }
    }
};



