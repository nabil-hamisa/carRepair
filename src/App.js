import React from 'react';
import AppContainer from './navigation';
import {Provider} from 'react-redux';
import {createClient} from './ApolloClient';
import persistedStore from "./Store";
import {PersistGate} from "redux-persist/integration/react";
import AuthLoading from '../screens/Auth/AuthLoading'
const App = ()=>{
    createClient();
    return     <Provider store={persistedStore.store}>
        <PersistGate persistor={persistedStore.persistor} loading={<AuthLoading />}>
            <AppContainer/>
        </PersistGate>
    </Provider>
};

export default App;
