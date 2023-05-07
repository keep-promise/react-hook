// Reducer 入参：原始状态state、执行动作

// countReducer demo
function countReducer(state, action) {
  switch(action.type) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    default:
      return state;
  }
}