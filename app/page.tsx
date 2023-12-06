// @ts-nocheck

"use client";
import React, { useReducer, useEffect } from "react";

// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
const LOAD_CART = "LOAD_CART";

// Reducer Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { product: action.payload, quantity: 1 },
        ],
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case LOAD_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

// Custom hook for managing local storage
const useLocalStorage = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return storedValue;
};

const ShoppingCart = () => {
  const cartState = useLocalStorage("shoppingCart", { cartItems: [] });
  const [cart, dispatch] = useReducer(cartReducer, cartState);

  const product = { id: 1, name: "Example Product", price: 29.99 }; // Replace with your actual product data

  const addToCart = () => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const incrementQuantity = (productId) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: productId });
  };

  return (
    <div className="px-16">
      <h2 className="text-2xl">Shopping Cart</h2>

      {/* Cart Icon */}
      <div className="text-right">
        <span className="text-blue-500 font-bold ml-1">
          {cart.cartItems.length}
        </span>
      </div>

      <div className="max-w-md bg-white p-8 rounded shadow-md">
        <img
          src="https://placekitten.com/300/200"
          alt="Product Image"
          className="w-full mb-4 rounded-md"
        />

        <h2 className="text-xl font-bold mb-2">Product Name</h2>
        <p className="text-gray-700 text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-bold">$29.99</span>
          <button
            onClick={addToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <p>
        Total Amount: $
        {cart.cartItems?.reduce((total, item) =>
          total + item.product.price * item.quantity, 0
        )}
      </p>
    </div>
  );
};

export default ShoppingCart;
