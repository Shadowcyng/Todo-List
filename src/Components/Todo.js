import React, {useState} from 'react'
import { ListItem, List, ListItemText,  TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import db from './firebase'
import Modal from 'react-modal'
import './Todo.css'

const DL= makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }))

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      margin: (150, 250)
    },
  }))
  const customStyles = {
    content : {
     top:'10%',
     left:'10%',
     bottom :'10%',
     right:'10%',
    },
    overlay:{
      paddingRight:'20px'
    }
  };
  Modal.setAppElement('#modal')

function Todo(props) {
    const[open,setOpen] = useState(false)
    const[input,setInput] = useState('')
    const[deadLine,setDeadLine] = useState(props.todos.deadLine)
    const updateTodo = (event) =>{
        event.preventDefault()
        db.collection('todos').doc(props.todos.id).set({
            todo:input,
            deadLine:deadLine
        },{merge:true})
        setOpen(false)
    }
    return (
        <>
        <Modal 
        isOpen={open} 
        shouldCloseOnOverlayClick= {true}
        onRequestClose={()=> setOpen(false)} 
        style={customStyles}
        contentLabel="Example Modal"
        // className='Modal'
      
        >
          <div className={useStyles().paper}  >
            <form>
            <TextField id="standard-basic" placeholder={props.todos.todo} variant="filled" 
             value={input} onChange={(e)=>setInput(e.target.value)}
            />
            <TextField
        id="datetime-local"
        placeholder="⏰ Dead Line"
        type="datetime-local"
        // defaultValue={props.todos.deadLine}
        value={deadLine}
        onChange={(event)=>setDeadLine(event.target.value.toString())}
        className={DL().textField}
        style={{padding:'5px'}}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div>
            <button onClick={updateTodo} type='submit'className='button1'>
               UPDATE
            </button>
            <button onClick={()=>setOpen(false)} className='button1'>
            CANCEL
            </button>
            </div> 
            </form>
            </div>
        </Modal>
        <div className='bg-light-green dib br3 ma3 grow bw3 shadow-5'>
        <List>
            <ListItem >
                <ListItemText  primary={props.todos.todo}secondary={"DeadLine :"+ props.todos.deadLine} />
            </ListItem>
            <EditIcon onClick={()=>{setOpen(true)}} className='button' />
            <DeleteIcon onClick = {() => db.collection('todos').doc(props.todos.id).delete()} className='button' />
        </List>

        </div>
        
        </>
    )
}

export default Todo
