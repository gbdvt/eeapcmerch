import { createStore, combineReducers } from 'redux'

import Auth from './Reducers/Auth'
import Cart from './Reducers/Cart'

const store = createStore(combineReducers({
    auth: Auth,
    cart: Cart
},
), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store