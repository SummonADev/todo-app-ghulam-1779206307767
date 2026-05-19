import { useState, useRef, useEffect } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { Todo } from '@/types';
import clsx from 'clsx';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSubmit(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed)}>
      <button
        className={clsx(styles.checkbox, todo.completed && styles.checked)}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {todo.completed && <Check size={14} />}
      </button>

      <span
        className={clsx(styles.priorityDot, styles[`priority_${todo.priority}`])}
        title={`Priority: ${todo.priority}`}
      />

      {editing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleEditKeyDown}
        />
      ) : (
        <span className={styles.text} onDoubleClick={() => setEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className={styles.actions}>
        {editing ? (
          <>
            <button
              className={clsx(styles.actionBtn, styles.confirm)}
              onClick={handleEditSubmit}
              aria-label="Confirm edit"
            >
              <Check size={15} />
            </button>
            <button
              className={clsx(styles.actionBtn, styles.cancel)}
              onClick={() => {
                setEditText(todo.text);
                setEditing(false);
              }}
              aria-label="Cancel edit"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              className={clsx(styles.actionBtn, styles.edit)}
              onClick={() => setEditing(true)}
              aria-label="Edit todo"
            >
              <Pencil size={15} />
            </button>
            <button
              className={clsx(styles.actionBtn, styles.delete)}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete todo"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
