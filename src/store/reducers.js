const initialState = {
  authToken: null,
  employeeId: null,
  businessUnitId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...action.payload,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
