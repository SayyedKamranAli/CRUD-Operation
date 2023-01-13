import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  increaseCounter,
  decreaseCounter,
} from "../redux/Counter/counter.actions";
import Index from "../components";
function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const next = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    next("/crud");
  };

  return (
    <div>
      <button
        className="mx-2 btn btn-success"
        type="submit"
        onClick={handleClick}
      >
        Click To CRUD Operation
      </button>

      <h2>Number of items in Cart: {state.counter.count}</h2>
      <button
        onClick={() => {
          dispatch(increaseCounter());
        }}
      >
        Add Item to Cart
      </button>
      <button
        disabled={state.counter.count > 0 ? false : true}
        onClick={() => {
          dispatch(decreaseCounter());
        }}
      >
        Remove Item to Cart
      </button>
      <Index/>
    </div>
  );
}

export default Home;
