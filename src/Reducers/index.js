import * as C from "../Consts";
import initialState from "../Consts/initState";
export default (state={},action)=>{
    switch (action.type) {
        case C.APOLLO_CLIENT_LOADED:
            return {...state,apolloClientLoaded:true};
        case C.LOGIN:
            return {...state,loads:{...state.loads,login:true}};
        case C.LOGIN_SUCCESS:
            return {...state,loads:{...state.loads,login:false},me:action.payload.me,loggedIn:true,isManager:action.payload.isManager,lang:action.payload.me.language,token:action.payload.token};
        case C.LOGIN_ERROR:
            return {...state,loads:{...state.loads,login:false},errors:{...state.errors,login:action.payload}};
        case C.CLEAR_LOGIN_ERRORS:
            return {...state,errors:{...state.errors,login:null}};
        case C.REGISTER:
            return {...state,loads:{...state.loads,register:true}};
        case C.REGISTER_SUCCESS:
            return {...state,loads:{...state.loads,register:false},me:action.payload.me,loggedIn:true,lang:action.payload.me.language,token:action.payload.token};
        case C.REGISTER_ERROR:
            return {...state,loads:{...state.loads,register:false},errors:{...state.errors,register:action.payload}};
        case C.CLEAR_REGISTER_ERRORS:
            return {...state,errors:{...state.errors,register:null}};
        case C.STATS:
            return {...state,loads:{...state.loads,stats:true}};
        case C.STATS_SUCCESS:
            return {...state,loads:{...state.loads,stats:false},stats:action.payload};
        case C.STATS_ERROR:
            return {...state,loads:{...state.loads,stats:false},errors:{...state.errors,stats:action.payload}};
        case C.BILLS:
            return {...state,loads:{...state.loads,bills:true}};
        case C.BILLS_SUCCESS:
            return {...state,loads:{...state.loads,bills:false},bills:action.payload};
        case C.BILLS_ERROR:
            return {...state,loads:{...state.loads,bills:false},errors:{...state.errors,bills:action.payload}};
        case C.BRANDS:
            return {...state,loads:{...state.loads,brands:true}};
        case C.BRANDS_SUCCESS:
            return {...state,loads:{...state.loads,brands:false},brands:action.payload};
        case C.BRANDS_ERROR:
            return {...state,loads:{...state.loads,brands:false},errors:{...state.errors,brands:action.payload}};
        case C.SHEETS:
            return {...state,loads:{...state.loads,sheets:true}};
        case C.SHEETS_SUCCESS:
            return {...state,loads:{...state.loads,sheets:false},sheets:action.payload};
        case C.SHEETS_ERROR:
            return {...state,loads:{...state.loads,sheets:false},errors:{...state.errors,sheets:action.payload}};
        case C.CLIENTS:
            return {...state,loads:{...state.loads,clients:true}};
        case C.CLIENTS_SUCCESS:
            return {...state,loads:{...state.loads,clients:false},clients:action.payload};
        case C.CLIENTS_ERROR:
            return {...state,loads:{...state.loads,clients:false},errors:{...state.errors,clients:action.payload}};
        case C.MECHANICIANS:
            return {...state,loads:{...state.loads,mechanicians:true}};
        case C.MECHANICIANS_SUCCESS:
            console.log(action.payload);
            return {...state,loads:{...state.loads,mechanicians:false},mechanicians:action.payload};
        case C.MECHANICIANS_ERROR:
            return {...state,loads:{...state.loads,mechanicians:false},errors:{...state.errors,mechanicians:action.payload}};

        case C.LOGOUT:
            return initialState;
        default:return state;
    }
}
