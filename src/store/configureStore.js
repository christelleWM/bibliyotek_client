import {persistStore,persistReducer} from 'redux-persist';
import {createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'

const persistConfig = {
  key: 'root',
  storage:storage,

}
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store= createStore(persistedReducer,composeWithDevTools());

export const persistor = persistStore(store);