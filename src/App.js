import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { arrowFunctionExpression } from '../../../../AppData/Local/Microsoft/TypeScript/4.6/node_modules/@babel/types/lib/index';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트 기초 연습중 따라타이핑하는거지만',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '어우 은근 생각할게 많고 번거롭다',
  //     checked: false,
  //   },
  //   {
  //     id: 3,
  //     text: '그래도 익숙해지면 편하긴 할 듯',
  //     checked: false,
  //   },
  // ]);

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextID = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextID.current,
      text,
      checked: false,
    };
    //setTodos((todos) => todos.concat(todo));
    dispatch({ type: 'INSERT', todo });
    nextID.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    //setTodos(todos.filter((todo) => todo.id !== id));
    //setTodos((todos) => todos.filter((todo) => todo.id !== id));
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //   ),
    // );
    // setTodos((todos) =>
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //   ),
    // );
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </div>
  );
};

export default App;
