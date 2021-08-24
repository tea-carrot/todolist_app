export const reducer = (state, action) => {
  switch (action.type) {
    // Todo
    case 'INSERT_TODO':
      return {...state, todos: [...state.todos, action.todo]};
    case 'COMPLETE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return todo.id == action.id
            ? {...todo, isComplete: !todo.isComplete}
            : todo;
        }),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return todo.id == action.id ? {...todo, deleted: true} : todo;
        }),
      };
    case 'SELECTED_SLIDE_LEFT':
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return todo.id == action.id
            ? {...todo, selected: !todo.selected}
            : {...todo, selected: false};
        }),
      };
    case 'SELECTED_SLIDE_INIT':
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return {...todo, selected: false};
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
