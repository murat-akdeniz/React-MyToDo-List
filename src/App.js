import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid";
import './App.css'
import Header from './Header'


import { FaRegTrashAlt } from "react-icons/fa";
import { GrCheckboxSelected } from 'react-icons/gr'


const arr = () => {
  let data = localStorage.getItem('todo');
  if (data) return JSON.parse(data);
  else return []
}

function App() {
  const [todo, setTodo] = useState('')
  const [list, setList] = useState(arr)
  const [checked, setChecked] = useState(false)

  console.log(list);
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(list))
  }, [list])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      todo: todo,
      checked: checked
    };

    if (todo) {
      setList((prev) => [...prev, newItem]);
      setTodo('');
    }
  }
  const deleteItem = (id) => {
    setList(list.filter((el) => el.id !== id));
  }
  const handleChange = () => {

  }

  return (
    <div>
      <Header /><br /><br />

      <form onSubmit={handleSubmit}>
        <div className='container'>
          <input
            className='input'
            type="text"
            placeholder='Enter Somthing'
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value)
            }}
          />
          <button className="btn" >
            Add Task
          </button>
        </div>
      </form>
      <div className="list">
        {list.map((item, index) => {
          return (
            <div className='todoList' key={index}>
              <p
                className='paragraf'
                style={item.checked ? { textDecoration: 'line-through' } : {}}
              >{item.todo}</p>

              <button onClick={() => deleteItem(item.id)} className='btn1'>
                <FaRegTrashAlt size='1.5rem' />
              </button>

              <button className='btn2'>
                <input
                  type="checkbox"
                  onChange={handleChange}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default App