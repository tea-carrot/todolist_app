export const reducer = (state, action) => {
  switch (action.type) {
    case 'INSERT_TODO':
      return [...state, action.todo];
    case 'increment':
      return [...state, action.todo];
    case 'decrement':
      return {...state, count: state.count - 1};
    default:
      return state;
  }
};
