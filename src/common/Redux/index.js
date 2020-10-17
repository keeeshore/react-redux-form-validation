import React from 'react';
import { createStore } from "redux";
import { combineReducers } from "redux";

const defaultCustomerState = {
    // email: `kishore.balan+${new Date().toUTCString().substr(5, 20).replace(/[ ,:-]/g, '.')}@news.com.au`,
    // password: 'UGFzc3dvcmQxMjM=',
    firstName: 'Test',
    lastName: 'B'
};

const defaultOfferSetState = {
    test: 'ooooooooooo',
    pkgDef: '111'
};

const offerset = (state = defaultOfferSetState, action) => {
    // console.log(' REDUX offerset called with action : ', action);
    switch (action.type) {
        case 'OFFERSET': {
            return { ...state, ...action.payload };
        }
        default: {
            return state;
        }
    }
};

const customer = function(state = defaultCustomerState, action) {
    console.log(' REDUX customer called with action : ', action);
    let newState = state;
    switch (action.type) {
        case 'CUSTOMER': {
            newState =  { ...state, ...action.payload  };
            break;
        }
        case 'UPDATE_CUSTOMER': {
            newState =  { ...state, ...action.payload  };
            break;
        }
        default:
            newState = state;
    }
    return newState;

};

const rootReducer = combineReducers({ customer, offerset });

const store = createStore(rootReducer, window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_());

const AppDataContext = React.createContext();

const data = {'test': '111111111111'};

export { store, data, AppDataContext };

// export default createStore((state = initialState, action) => {
//     console.log(' REDUX todos called with', action);
//     console.log(' REDUX todos called state', state);
//     switch (action.type) {
//         case 'ADD_TODO': {
//             return { test: 1111111111, ...state };
//         }
//         case 'TOGGLE_TODO': {
//             return { test: 2222222, ...state };
//         }
//         default:
//             return state;
//     }
// });
