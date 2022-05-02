import { ICartProduct } from '../../interfaces';
import {CartState, IOrderSummary} from './';


type CartActionType = 
| { type: '[Cart] - Load cart from cookies | storage', payload: ICartProduct[]}
| { type: '[Cart] - Update products in cart', payload: ICartProduct[]}
| { type: '[Cart] - Change cart quantity', payload: ICartProduct}
| { type: '[Cart] - Remove cart product', payload: ICartProduct}
| { type: '[Cart] - Update Order Summary', payload: IOrderSummary}


export const cartReducer = (state: CartState, action: CartActionType ):CartState => {

    switch(action.type) {
        case '[Cart] - Load cart from cookies | storage':
            return{
                ...state,
                cart: [...action.payload]
            }
        case '[Cart] - Update products in cart':
            return{
                ...state,
                cart:[...action.payload]
            }
        case '[Cart] - Change cart quantity':{
            return{
                ...state,
                cart: state.cart.map(p => {
                    if(p._id !== action.payload._id) return p;
                    if(p.size !== action.payload.size) return p;
                    p.quantity = action.payload.quantity;
                    return p
                })
            }
        }

        case '[Cart] - Remove cart product':
            return{
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }

        case '[Cart] - Update Order Summary':
            return{
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}