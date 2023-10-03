import React, { useEffect, useState } from 'react'
import './style.css'

function App() {
  const [input, setInput] = useState('')
  const [todoHold, setTodoHold] = useState([])

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodoHold(savedTodos);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoHold));
  }, [todoHold]);


  function handleAdd() {
    const todo = {
      id: Math.floor(Math.random() * 1000),
      value: input
    }
    setTodoHold(prevTodo => [...prevTodo, todo])
    setInput('')
  }

  function handleDelete(id) {
    setTodoHold(todoHold.filter(item => { return item.id !== id }))
  }

  return (
    <div className='app'>
      <h1>Todo List</h1>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Enter your task...'
          onChange={event => setInput(event.target.value)}
          value={input}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className='todo-list'>
        {todoHold.map(item => (
          <div className='todo-item' key={item.id}>
            <p>{item.value}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
