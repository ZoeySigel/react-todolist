type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const checkboxId = `todo-check-${todo.id}`;

  return (
    <li className={`todo${todo.completed ? " is-done" : ""}`}>
      <input
        id={checkboxId}
        className="todo__check"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <label className="todo__text" htmlFor={checkboxId}>
        {todo.text}
      </label>

      <button
        type="button"
        className="todo__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`删除待办：${todo.text}`}
        title="删除"
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}

export default TodoItem;
