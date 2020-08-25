import React, {useState} from 'react'
import { Button,FormControl,InputLabel,Input, TextField, makeStyles } from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import firebase from 'firebase'
import db from './firebase'

const useStyles = makeStyles((theme) => ({
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
  
function Form(props) {
    const[input,setInput] = useState('')
    const[deadLine,setDealLine]=useState('')
    const addTodo = (event) => {
        event.preventDefault() //Will stop refreshing
          db.collection('todos').add({
            todo: input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            deadLine:deadLine
          })
          setInput('') //Clearing up input
          setDealLine('')
      }
    return (
     <form>
      <FormControl style={{padding:'20px'}}>
        <InputLabel className='inputlable'><CheckBoxIcon style={{color:'#0ccac4'}}/>Write Todo</InputLabel>   
        <Input type='text'value={input} onChange = {(event)=>setInput(event.target.value)} />
      </FormControl>
        <TextField
        id="datetime-local"
        label="⏰ Dead Line"
        type="datetime-local"
        value={deadLine}
        onChange={(event)=>setDealLine(event.target.value.toString())}
        className={useStyles().textField}
        style={{padding:'5px'}}
        InputLabelProps={{
          shrink: true,
        }
    }
      />
      <Button disabled = {!(input && deadLine) } type='submit' onClick={addTodo} variant="contained" 
      color='primary'style={{backgroundColor:'#0ccac4'}}
      >
        Add TODO
      </Button> {/* Material UI Botton */}
             </form>

    )
}

export default Form
