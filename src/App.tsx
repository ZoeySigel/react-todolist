import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = () => {
    if (!text.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setText("");
  };
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div>
      <h1>Hello react</h1>
      <p>当前数字{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点我
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="请输入文本"
      />
      <button onClick={addTodo}>添加</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                toggleTodo(todo.id);
              }}
            />
            <p>{todo.text}</p>
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
