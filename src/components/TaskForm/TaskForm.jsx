import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const { newTaskText, handleAddTask, handleChange } = useContext(TodoContext);
  return (
    <form onSubmit={handleAddTask} className={styles.form}>
      <input
        type='text'
        placeholder='Что нужно сделать?'
        value={newTaskText}
        onChange={handleChange}
      />
      <button type='submit'>Добавить</button>
    </form>
  );
};

export default TaskForm;