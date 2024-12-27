import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Dummy data for tasks (to simulate tasks before backend integration)
const tasks = [
  { id: 1, title: 'Complete Homework', description: 'Complete React task', priority: 'High', status: 'In Progress' },
  { id: 2, title: 'Buy Groceries', description: 'Buy milk and eggs', priority: 'Medium', status: 'Completed' },
  { id: 3, title: 'Prepare for Exam', description: 'Study for Math exam', priority: 'High', status: 'Not Started' },
];

function App() {
  const [taskList, setTaskList] = useState(tasks);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Task Management Application</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasks">View Tasks</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </header>
      </div>
    </Router>
  );

  function Home() {
    return (
      <>
        <h2>Welcome to the Task Management System</h2>
        <p>Manage your tasks efficiently!</p>
      </>
    );
  }

  function TaskList() {
    return (
      <>
        <h2>Your Tasks</h2>
        <div className="task-list">
          {taskList.map(task => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <button onClick={() => handleTaskCompletion(task.id)}>
                Mark as {task.status === 'Completed' ? 'Incomplete' : 'Completed'}
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }

  function handleTaskCompletion(id) {
    setTaskList(taskList.map(task => 
      task.id === id 
      ? { ...task, status: task.status === 'Completed' ? 'Not Started' : 'Completed' } 
      : task
    ));
  }
}

export default App;
