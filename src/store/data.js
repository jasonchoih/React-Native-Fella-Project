import { init } from "@rematch/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import createPersistPlugin from "@rematch/persist";
import { getPersistor } from "@rematch/persist";
// 
// import middleware from './middleware';
// 
const auths = {
    state: {}, 
    reducers: {
        AUT(state, payload) {
            return { ...state, ...payload }
        },
        DEL(state, payload) {
            AsyncStorage.removeItem('persist:root');
            // return null;
            return { ...{} }
        }
    }
};
// 
const models = {
    state: {}, 
    reducers: {
        SET(state, payload) {
            return { ...state, ...payload }
        }
    }
};
// 
const persistPlugin = createPersistPlugin({
	key: 'root',
	storage: AsyncStorage,
	version: 2,
	whitelist: ['auths']
})
// AsyncStorage.removeItem('persist:root');
// 
const store = init({ 
    models: {
        auths, 
        models
    },
    plugins: [persistPlugin],
    // redux: {
    //     middlewares: [middleware],
    // },
    
});
// 
const persistor = getPersistor();
// 
export{
    store,
    persistor
}