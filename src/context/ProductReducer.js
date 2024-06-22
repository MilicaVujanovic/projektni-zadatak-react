
const initialState = {
  items: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};



