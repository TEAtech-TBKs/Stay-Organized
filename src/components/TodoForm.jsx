import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    addTodo(title.trim());
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Add new todo">
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Todo title"
        autoFocus
      />
      <button type="submit" className="todo-button" aria-label="Add todo">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
