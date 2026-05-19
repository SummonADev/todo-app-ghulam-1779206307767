import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput/TodoInput';
import TodoList from '@/components/TodoList/TodoList';
import TodoFooter from '@/components/TodoFooter/TodoFooter';
import styles from './TodoApp.module.css';

export default function TodoApp() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>todos</h1>
        <p className={styles.subtitle}>Stay organized, stay productive.</p>
      </header>

      <div className={styles.card}>
        <TodoInput onAdd={addTodo} onToggleAll={toggleAll} hasItems={allTodos.length > 0} />

        {allTodos.length > 0 && (
          <>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          </>
        )}

        {allTodos.length === 0 && (
          <div className={styles.empty}>
            <p>No todos yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
