import { useState } from 'react';
import { Plus, ChevronsDown } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';
import styles from './TodoInput.module.css';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
  onToggleAll: () => void;
  hasItems: boolean;
};

export default function TodoInput({ onAdd, onToggleAll, hasItems }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
    setPriority('medium');
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {hasItems && (
          <button
            type="button"
            onClick={onToggleAll}
            className={styles.toggleAll}
            title="Toggle all"
          >
            <ChevronsDown size={18} />
          </button>
        )}
        <input
          className={styles.input}
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="What needs to be done?"
          autoFocus
        />
        <select
          className={clsx(styles.prioritySelect, styles[priority])}
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className={styles.addBtn} disabled={!text.trim()}>
          <Plus size={20} />
        </button>
      </form>
    </div>
  );
}
