import { useState } from "react";
import TodoList from "./TodoList";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

const FILTERS: ReadonlyArray<{ key: Filter; label: string }> = [
  { key: "all", label: "全部" },
  { key: "active", label: "未完成" },
  { key: "completed", label: "已完成" },
];

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
    const value = text.trim();
    if (!value) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: value,
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
    <div className="app">
      <header className="hero">
        <p className="hero__eyebrow">Neubrutalism Edition</p>
        <h1 className="hero__title">
          待办<span className="hero__mark">清单</span>
        </h1>
        <p className="hero__sub">
          粗描边 · 硬阴影 · 高饱和撞色 —— 把每一件小事都做得清清楚楚。
        </p>
      </header>

      <main className="stack">
        <section className="panel" aria-labelledby="counter-title">
          <div className="panel__head">
            <h2 className="panel__title" id="counter-title">
              计数器
            </h2>
            <span className="tag tag--cyan">Demo</span>
          </div>

          <div className="counter">
            <output className="counter__value" aria-live="polite">
              {count}
            </output>

            <div className="counter__actions">
              <button
                type="button"
                className="btn btn--pink"
                onClick={() => setCount(count - 1)}
                aria-label="数字减一"
              >
                −1
              </button>

              <button
                type="button"
                className="btn btn--lime"
                onClick={() => setCount(count + 1)}
                aria-label="数字加一"
              >
                +1
              </button>

              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setCount(0)}
              >
                清零
              </button>
            </div>
          </div>
        </section>

        <section className="panel" aria-labelledby="todo-title">
          <div className="panel__head">
            <h2 className="panel__title" id="todo-title">
              待办事项
            </h2>
            <span className="badge" aria-live="polite">
              剩余 {remainingCount} 项
            </span>
          </div>

          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault();
              addTodo();
            }}
          >
            <label className="sr-only" htmlFor="todo-input">
              新建待办事项
            </label>
            <input
              id="todo-input"
              className="composer__input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="今天想完成什么？"
              autoComplete="off"
            />
            <button type="submit" className="btn btn--yellow composer__submit">
              添加
            </button>
          </form>

          <div className="filters" role="group" aria-label="筛选待办事项">
            {FILTERS.map((item) => {
              const isActive = filter === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`chip${isActive ? " is-active" : ""}`}
                  aria-pressed={isActive}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {todos.length === 0 ? (
            <p className="empty">暂无任务 —— 在上方输入框写下第一件事吧。</p>
          ) : filteredTodos.length === 0 ? (
            <p className="empty">当前筛选下没有任务。</p>
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
