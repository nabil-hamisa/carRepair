import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from '../Reducers';
import {persistStore,persistReducer} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import initState from "../Consts/initState";
const persistConfig = {
    timeout: 10000,
    key: 'root@carRepair',
    storage,
    stateReconciler:autoMergeLevel2,
    whitelist:['me','token']
};
const persistedReducer = persistReducer(persistConfig,reducer);
const persistedStore = ()=>{
    let store = createStore(persistedReducer,initState,applyMiddleware(thunk));
    let persistor = persistStore(store);
    return {store,persistor};
};
export default persistedStore();
