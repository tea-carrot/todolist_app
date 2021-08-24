export const reducer = (state, action) => {
  switch (action.type) {
    // Todo
    case 'INSERT_TODO':
      return {...state, todos: [...state.todos, action.todo]};
    case 'COMPLETE_TODO':
      // return [...state, action.todo];
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return todo.id == action.id
            ? {...todo, isComplete: !todo.isComplete}
            : todo;
        }),
      };

    // Category
    case 'INSERT_CATEGORY':
      return {...state, categories: [...state.categories, action.category]};
    // return {
    // ...state,
    // categories: [...state.categories, {id: 3, emoji: '🍴', title: '식사2'}],
    // };
    default:
      return state;
  }
};
