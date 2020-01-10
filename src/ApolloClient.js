import ApolloClient from 'apollo-client/index';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {createUploadLink} from "apollo-upload-client";

let apolloClient;

const uploadLink = createUploadLink({
    uri:"https://garage-app-mohamed.herokuapp.com/graphql"
});
const setToken =(token:String)=> {
    return setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            }
        }
    });
};
export const cache = new InMemoryCache();
export const createClient =async (token:?String):ApolloClient=>{
    apolloClient = await new ApolloClient({
        link: typeof token == "undefined" ? uploadLink : setToken(token).concat(uploadLink),
        cache
    });
    return apolloClient;
};
export default ():ApolloClient=>apolloClient;
