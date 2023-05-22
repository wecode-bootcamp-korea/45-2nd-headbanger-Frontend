const initialState = {
  productData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_DATA':
      return {
        ...state,
        productData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
