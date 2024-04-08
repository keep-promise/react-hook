const initState = 10;
const reducer = (state = initState, action) => {
  switch(action.type) {
    case 'add': 
      return state+1;
    case 'sub': 
      return state - 1;
    default: 
      return state;
  }
}

export default reducer;