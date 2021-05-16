import React, {useState, useEffect} from "react";
import Alert from './Alert.js'
import {categoryData} from './Category.js'
// import { FaBars } from 'react-icons/fa'

function App() {
  const [topic, setTopic] = useState('')
  const [text, setText]= useState('')
  const [list, setList]= useState('')
  const [isAlert, setIsAlert]= useState({state:false, status:'', msg:''})
  const [isEdit, setIsEdit]= useState(false)
  const [editId, setEditId]= useState(null)
  const [categories, setCategories]= useState([]);
  const [categoriesSelected, setCategoriesSelected]= useState([{ id:1,name:'uncategorized', color:'white'}])
  const [categoryName, setCategoryName]= useState('');
  const [categoryColor, setCategoryColor]= useState('');
  const [isNewCategory, setIsNewCategory]= useState(false)


const handleSubmit=(e)=>{
e.preventDefault();
if(!topic){
 showAlert(true, 'failure', 'Tell Me What You Need To Do');
}
 else if (topic && isEdit){
  showAlert(true, 'success', `${topic} changed`)
  //editing part

}else{
  if(categoryColor==false && categoryName==false ){

    showAlert(true, 'success', `${topic} added to list`)
const newList={id:new Date().getTime().toString(), title:topic, note:text, name:'uncategorized', color:'white'}
const newCategory={id:new Date().getTime().toString(), name:'uncategorized', color:'white'}

  setList([...list, newList]);
  const uniqueCategories=[...categoriesSelected, newCategory].reduce((a,c)=>{!a.find(v=>v.name===c.name) &&a.push(c);
    return a;
  
  },[])
 
  setCategoriesSelected(uniqueCategories);
  setTopic('');
  setText('');
  setCategoryName('');
  setCategoryColor('');

  }else{
showAlert(true, 'success', `${topic} added to list`)
const newList={id:new Date().getTime().toString(), title:topic, note:text, name:categoryName, color:categoryColor  }
const newCategory={id:new Date().getTime().toString(), name:categoryName, color:categoryColor}

  setList([...list, newList]);
  const uniqueCategories=[...categoriesSelected, newCategory].reduce((a,c)=>{!a.find(v=>v.name===c.name) &&a.push(c);
    return a;
  
  },[])
 
  setCategoriesSelected(uniqueCategories);
  setTopic('');
  setText('');
  setCategoryName('');
  setCategoryColor('');
}}
}

const showAlert = (state=false, status='', msg='')=>{
  setIsAlert({state, status, msg})
}
  return (<>
    <section className='section-center' >
      <div className='title'>
      <h2>Notes App</h2>
      </div>
      <div className='section'>
    <button className='nav-toggle' >
        <h1>+</h1>
      </button>
      <div className='form-box' onSubmit={handleSubmit}>
       {isAlert.state && <Alert {...isAlert} removeAlert={showAlert} list={list}/>} 

        <form className='form' >

            
          <h4>Select Category</h4>
          <div className='category'>
          {categoriesSelected.map(category=>{
              const {name, color}= category
               const myStyle1= {backgroundColor: `${color}`,
                  height:'20px',
                  width:'90px',
                  padding:' 5px 10px',
                  borderRadius:'10px',
                  textAlign:'center',
                  cursor:'pointer'
          }
              return(<div className='categoryDiv'>
            <div className='categoryCircle'
            style={myStyle1} 
            onClick={()=>{setCategoryColor(color); setCategoryName(name)}}>
             {name}
            </div>
            
                <br/>
         
              </div>)
              
          }
          )}
           <button className='btn-category' onClick={()=>setIsNewCategory(!isNewCategory)}>+ New Category</button>
           
          {isNewCategory && 
         <div >  
           
          <input type='text'
              placeholder='category name?'
              value={categoryName}
              onChange={(e)=>setCategoryName(e.target.value)}
              className='categoryName'
              />
              <div className='colors-Div'>
            <h6>colors</h6>  <div className='dottedLines'></div></div>
          <div className='circles'>
          {categoryData.map((unit)=>{
            const {id, code, name}= unit
             const myStyle= {backgroundColor: `${code}`,
                  height:'40px',
                  width:'40px',
                  borderRadius:'50%',
                  pointer:'cursor'
          
                 
          }
            return (<div className='category-Colors'>
              
            <div key={id}
            style={myStyle}
            onClick={()=>setCategoryColor(code)}>
             
            </div>
           
            
            </div>)
          })}
          </div>
          </div>}
         
        </div>

         <input type='text' 
         placeholder='Title'
         value={topic}
         onChange={(e)=>setTopic(e.target.value)}></input>
         <br></br>

         <input type='text' 
         placeholder='Notes'
         value={text}
         onChange={(e)=>setText(e.target.value)}
         ></input>
         <br></br>
        
      
         <button type='submit' > {isEdit? 'edit' :'Add to List'}</button>
          </form>
      </div>
      </div>
    </section>
  </>);
}

export default App;
