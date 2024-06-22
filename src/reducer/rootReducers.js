
import { combineReducers } from 'redux';
import {ProductReducer} from '../context/ProductReducer'; 


const rootReducer = combineReducers({
  products: ProductReducer, 
});

export default rootReducer;
