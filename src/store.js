import { createStore } from 'redux';
import rootReducer from './reducer/rootReducers';

const store = createStore(rootReducer); 

export default store;
