import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import styles from './TaskPage.module.css';

const TaskPage = () => {
  const { isLoading, handleToggleCheckbox, handleDeleteTask, displayTools } =
    useContext(TodoContext);

  return (
    <>
      {isLoading ? (
        <h1 className={styles.loading}>Загрузка...</h1>
      ) : (
        <ul className={styles.list}>
          {displayTools.map(({ id, title, completed }) => (
            <li key={id}>
              <input
                type='checkbox'
                checked={completed}
                onChange={() => handleToggleCheckbox(id, completed)}
              />
              <span className={completed ? styles.completed : ''}>{title}</span>
              <button onClick={() => handleDeleteTask(id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TaskPage;
