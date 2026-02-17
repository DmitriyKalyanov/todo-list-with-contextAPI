import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import styles from './TaskSearch.module.css';

const TaskSearch = () => {
  const {
    searchQuery,
    handleSearchChange,
    setIsSorted,
    isSorted,
    todoList,
    filteredTodos,
  } = useContext(TodoContext);
  return (
    <>
      <div className={styles.searchContainer}>
        <label htmlFor='search'>Найти задачу: </label>
        <input
          type='search'
          id='search'
          placeholder='Введите фразу...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className={styles.sortButton}
          onClick={() => setIsSorted(!isSorted)}
        >
          {!isSorted ? 'Сортировать по алфавиту' : 'Обычная сортировка'}
        </button>
      </div>
      {todoList.length === 0 && (
        <p className={styles.message}>
          Список дел пуст. Добавьте первую задачу!
        </p>
      )}

      {searchQuery && filteredTodos.length === 0 && (
        <p className={styles.message}>
          По запросу "{searchQuery}" ничего не найдено
        </p>
      )}
    </>
  );
};

export default TaskSearch;
