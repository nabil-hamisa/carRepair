import React from 'react';
import AppContainer from './navigation/Index';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {createStore, combineReducers} from 'redux';
import managerReducer from './Store/reducers/Manager';
import {Provider} from 'react-redux';


  const client = new ApolloClient({
    link: new HttpLink({uri: 'https://garage-app-mohamed.herokuapp.com/graphql'}),
    cache: new InMemoryCache(),


});

const rootReducer = combineReducers({
    manager: managerReducer,
});

const store = createStore(rootReducer);



const App = () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </ApolloProvider>
);

export default App;
