import React, { useState, useEffect } from 'react'
import Todo from './Components/Todo'
import './App.css'
import db from './Components/firebase'
import 'tachyons'
import Scroll from './Components/Scroll'
import Form from './Components/Form'

function App() {
  const [todos,setTodos] = useState([])

  //When the app loads, we  need to fetch the todos from our database and fetch new todos as they get added or removed
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setTodos(snapshot.docs.map(doc => ({
        id:doc.id, 
        todo:doc.data().todo,
        deadLine:doc.data().deadLine
      })))
    })
   
  }, [])

    return (
    <div className="App">
      <h1>TODO LIST</h1>
      <Form />
      <Scroll>
      <ul>
        {todos.map(todo =>
        <Todo todos = {todo} key={todo.id}/>
        )}
      </ul>
      </Scroll>
    </div>
  )
}

export default App
