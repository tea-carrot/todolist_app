export const reducer = (state, action) => {
  switch (action.type) {
    case 'INSERT_TODO':
      return [...state, action.todo];
    case 'COMPLETE_TODO':
      // return [...state, action.todo];
      return state.map((todo, index) => {
        return todo.id == action.id
          ? {...todo, isComplete: !todo.isComplete}
          : todo;
      });
    default:
      return state;
  }
};
