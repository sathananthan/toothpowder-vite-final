/*eslint-disable*/
export const initialstate = {
  basket: [],
  user: {
    name: "",
    email: "",
    age: "",
    Address: "",
    phno: "",
    password: "",
    basket: [],
  },
};

export const getTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.qty + amount, 0); //here accummulator is amount is default 0
//and the total of item price

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, { ...action.item, qty: 1 }],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_CART":
      /* const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in basket!`
        );
      }

       return {
         ...state,
         basket: newBasket,
       }; */

      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    case "CHGE_BASK_QTY":
      return {
        ...state,
        basket: state.basket.filter((b) =>
          b.id == action.item.id ? (b.qty = action.item.qty) : b.qty
        ),
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
