import { useState } from "react";
import TodoList from "./TodoList";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [count, setCount] = useState<number>(0);

  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filter, setFilter] = useState<Filter>("all");

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  const addTodo = () => {
    if (!text.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div>
      <h1>React Demo</h1>

      <section>
        <h2>Counter</h2>

        <p>当前数字：{count}</p>

        <button onClick={() => setCount(count - 1)}>-1</button>

        <button onClick={() => setCount(count + 1)}>+1</button>

        <button onClick={() => setCount(0)}>清零</button>
      </section>

      <section>
        <h2>Todo</h2>

        <p>剩余{remainingCount}项</p>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="请输入待办事项"
        />

        <button onClick={addTodo}>添加</button>

        <div>
          <button onClick={() => setFilter("all")}>全部</button>

          <button onClick={() => setFilter("active")}>未完成</button>

          <button onClick={() => setFilter("completed")}>已完成</button>
        </div>

        {todos.length === 0 ? (
          <p>暂无任务</p>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      </section>
    </div>
  );
}

export default App;
