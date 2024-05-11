import React, { useState, useEffect } from 'react';

function LocalTasker() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Load tasks from local storage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { description: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  // Function to mark a task as completed
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Function to remove completed tasks
  const clearCompleted = () => {
    const filteredTasks = tasks.filter(task => !task.completed);
    setTasks(filteredTasks);
  };

  return (
    <div>
      <h1>LocalTasker</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? 'completed' : ''}
            onClick={() => toggleTaskCompletion(index)}
          >
            {task.description}
          </li>
        ))}
      </ul>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default LocalTasker;
