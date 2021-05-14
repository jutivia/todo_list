import React, {useState, useEffect} from "react";
import Alert from './Alert.js'

function App() {
  const [topic, setTopic] = useState('')
  const [text, setText]= useState('')
  const [list, setList]= useState('')
  const [isAlert, setIsAlert]= useState({state:false, status:'', msg:''})
  const [isEdit, setIsEdit]= useState(false)
  const [editId, setEditId]= useState(null)

const handleSubmit=(e)=>{
e.preventDefault();
if(!topic){
 showAlert(true, 'failure', 'Tell Me What You Need To Do');
}
 else if (topic && isEdit){
  showAlert(true, 'success', `${topic} changed`)
  //editing part

}else{
showAlert(true, 'success', `${topic} added to list`)
const newList={id:new Date().getTime().toString(), title:topic, note:''}
  setList([...list, newList]);
  setTopic('');
  setText('');
}


}

const showAlert =(state=false, status='', msg='')=>{
  setIsAlert(state, status, msg)
}
  return (
    <section className='section-center' >
      <div className='title'>
      <h2>To-Do List</h2>
      </div>

      <div className='form-box' onSubmit={handleSubmit}>
       {isAlert.state && <Alert {...isAlert} removeAlert={showAlert} list={list}/>} 
        <form className='form' >
         <input type='text' 
         placeholder='what do you have to do?'
         value={topic}
         onChange={(e)=>setTopic(e.target.value)}></input>
         <br></br>
         <input type='text' 
         placeholder='tell me more'
         value={text}
         onChange={(e)=>setText(e.target.value)}
         ></input>
         <br></br>
         <button type='submit' > {isEdit? 'edit' :'Add to List'}</button>
          </form>
      </div>
    </section>
  );
}

export default App;
