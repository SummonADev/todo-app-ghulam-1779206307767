import { Filter } from '@/types';
import clsx from 'clsx';
import styles from './TodoFooter.module.css';

type TodoFooterProps = {
  activeCount: number;
  completedCount: number;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFooter({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className={styles.footer}>
      <span className={styles.count}>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={clsx(styles.filterBtn, filter === f.value && styles.active)}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
      {completedCount === 0 && <span className={styles.spacer} />}
    </div>
  );
}
