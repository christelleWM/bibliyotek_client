import {combineReducers} from 'redux';
import {menuReducer} from './menuReducer';
import { paginationReducer } from './paginationReducer';
import {userReducer} from './userReducer';


const rootReducer = combineReducers({
    menu:menuReducer,
    user:userReducer,
    perpage:paginationReducer,
   

});

export default rootReducer;