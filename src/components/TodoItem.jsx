import React, { useState, useEffect, useRef } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleBlur = () => {
    if (editTitle.trim() === '') {
      setEditTitle(todo.title);
      setIsEditing(false);
      return;
    }
    updateTodo(todo.id, { title: editTitle.trim() });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="todo-edit-input"
            value={editTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label="Edit todo title"
          />
        ) : (
          <span className="todo-title" onDoubleClick={handleEdit} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleEdit(); }} role="textbox" aria-readonly="true">
            {todo.title}
          </span>
        )}
      </label>
      <button className="delete-button" onClick={handleDelete} aria-label={`Delete ${todo.title}`}>
        &times;
      </button>
    </li>
  );
}

export default TodoItem;
