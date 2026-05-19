import TodoApp from '@/components/TodoApp/TodoApp';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  return (
    <div className={styles.page}>
      <TodoApp />
    </div>
  );
}
