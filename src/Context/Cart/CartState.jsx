import { useReducer } from "react"
import CartContext from "./CartContext"
import CartReducer from "./CartReducer"
import {sumItems} from './CartReducer'

const CardState = ({childern}) =>{
    //the intial cart state
    const intialState = {
        cartItems:[],
        checkout:'false'
    }

    //reducer hook setup
    const [state,dispatch] = useReducer(CartReducer,intialState)

    //item add function from store to cart
    const addToCart = (payload)=>{
        dispatch({type:"ADD_TO_CART",payload})
    }

    //function to handle multiple adds of one item
    const increase = (payload)=>{
        dispatch({type:"INCREASE",payload})
    }
    
    //function to decrease the amount of one item in the cart
    const decrease = (payload)=>{
        dispatch({type:"DECREASE",payload})
    }

    //function to remove an item from the cart
    const removeFromCart = (payload) =>{
        dispatch({type:'REMOVE_ITEM',payload})
    }

    //function to clear from cart
    const clearFromCart = ()=>{
        dispatch({type:"CLEAR"})
    }

    //function to handle the checkout button
    const handleCheckout =()=>{
        dispatch({type:"CHECKOUT"})
    }

    return(
        //Add the functions that have been defined above into the Context provider, and pass on to the children
        <CartContext.Provider
            value={{
                showCart:state.showCart,
                cartItems:state.cartItems,
                addToCart,
                increase,
                decrease,
                clearFromCart,
                removeFromCart,
                handleCheckout,
                ...state,
            }}
        >
            {childern}
        </CartContext.Provider>
    )
}

export default CardState;