import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, productDetailsReducer, productReducer, reviewReducer } from "./reducers/productReducers";
import { allUsersReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
const reducer=combineReducers({
    product: productReducer,
    productDetails:productDetailsReducer,
    user:userReducer, 
    review:reviewReducer,
    newProduct:newProductReducer,
    deleteProduct:deleteProductReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
});
let initialState={};
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;
