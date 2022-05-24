import { REMOVE_ITEM,ADD_TO_CART,INCREASE,DECREASE,CHECKOUT,CLEAR} from "./CartTypes";

//export function to cal total item quntity and price
 
 export const sumItems = (cartItems) => {
     Storage(cartItems)
     let itemCount = cartItems.reduce(
         (total,product) => total + product.quantity,0
     )
     let total = cartItems
        .reduce((total,product)=>total + product.price * product.quantity,0)
        .toFixed(2)
    return {itemCount,total}
 }
 
 //the reducers is listening for a action, which is stored in the carttype
 const CardReducer = (state,action)=>{
    //this switch statement is checking the action type 
    switch(action.type){
        //when the type is ADD_TO_CART, it adds an item cartItems array
        case ADD_TO_CART:
            if(!state.cartItems.find((item)=>item.id === action.payload.id)){
                state.cartItems.push({
                    ...action.payload,
                    quantity:1
                })
            }
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems:[...state.cartItems],
            }
        //when the action type is REMOVE_ITEM
        case REMOVE_ITEM:
            return {
                ...state,
                ...sumItems(
                    state.cartItems.filter((item)=>item.id!==action.payload.id)
                ),
                cartItems:[
                    ...state.cartItems.filter((item)=>item.id!== action.payload.id),
                ]
            }
        //when the action typr is DECEARSED, this is for reducing the quantity of a certain item in the array cartItems
        case DECREASE:
            state.cartItems[
                state.cartItems.findIndex(item => item.id === action.payload.id)
            ].quantity--
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems:[...state.cartItems],
            }
        case INCREASE:
            state.cartItems[
                state.cartItems.findIndex(item => item.index === action.payload.id)
            ].quantity++
            return {
                ...state,
                ...sumItems(state.cartItems),
                cartItems:[...state.cartItems]
            }
        //if  action type is CHECKOUT, clear the cart and set checkout to true
        case CHECKOUT:
            return {
                cartItems:[],
                checkout:true,
                ...sumItems([]),
            }
        
        //if action type is CLEAR, to clear the cart
        case CLEAR:
            return {
                cartItems:[],
                ...sumItems([])
            }
        default:
            return state
     }
 }

 export default CardReducer