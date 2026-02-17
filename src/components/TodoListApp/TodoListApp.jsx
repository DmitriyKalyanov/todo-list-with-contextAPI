import { useEffect, useState } from 'react';
import styles from './TodoListApp.module.css';
import { TodoContext } from '../../TodoContext';
import TaskPage from '../TaskPage/TaskPage';
import TaskForm from '../TaskForm/TaskForm';
import TaskSearch from '../TaskSearch/TaskSearch';

function TodoListApp() {
  const [todoList, setTodoList] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3005/todos')
      .then((response) => response.json())
      .then((loadedData) => {
        setTodoList(loadedData);
      });
  }, []);

  const newTask = { title: newTaskText, completed: false };

  const handleChange = (e) => {
    setNewTaskText(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTask = () => {
    fetch('http://localhost:3005/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTodoList([...todoList, newTask]);
        setNewTaskText('');
      });
  };

  const handleDeleteTask = (id) => {
    setIsLoading(true);
    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        const deteleTask = todoList.filter((task) => task.id !== id);
        setTodoList(deteleTask);
      })
      .finally(() => setIsLoading(false));
  };

  const handleToggleCheckbox = (id, completed) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: !completed,
      }),
    })
      .then((response) => response.json())
      .then((updatedTaskFromServer) => {
        const newUpdatedTodoList = todoList.map((todo) => {
          if (todo.id === id) {
            return updatedTaskFromServer;
          }
          return todo;
        });
        return setTodoList(newUpdatedTodoList);
      });
  };

  const filteredTodos = todoList.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  let displayTools = filteredTodos;

  if (isSorted) {
    displayTools = [...filteredTodos].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  return (
    <TodoContext
      value={{
        isLoading,
        handleToggleCheckbox,
        handleDeleteTask,
        displayTools,
        newTaskText,
        handleAddTask,
        handleChange,
        searchQuery,
        handleSearchChange,
        setIsSorted,
        isSorted,
        todoList,
        filteredTodos,
      }}
    >
      <div className={styles.app}>
        <h1>Список дел:</h1>
        <TaskForm />
        <TaskSearch />
        <TaskPage />
      </div>
    </TodoContext>
  );
}

export default TodoListApp;
