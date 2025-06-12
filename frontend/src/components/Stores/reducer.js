

const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state, action) => {
    switch (action.type) {
      case "REGISTER_REQUEST":
        return { ...state, loading: true, error: null };
      case "REGISTER_SUCCESS":
        return { ...state, loading: false, user: action.payload };
      case "REGISTER_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };