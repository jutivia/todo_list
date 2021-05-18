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
  const[addClass, setAddClass]= useState(false)
  const[addNewNote, setAddNewNote]=useState(false)
  const[showNotes, setShowNotes]= useState(true)

  const categoriesTab=()=>{
    
  }


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
    <button className='nav-toggle' onClick={()=>{setAddNewNote(!addNewNote);
    setShowNotes(!showNotes);}} >
        <h1>+</h1>
      </button>
      {addNewNote && <>
      <div className='form-box' onSubmit={handleSubmit}>
       {isAlert.state && <Alert {...isAlert} removeAlert={showAlert} list={list}/>} 

        <form className='form' >     
          <h4>Select Category</h4>
          <div className='categories'>
            <div className='category'>
          {categoriesSelected.map(category=>{
              const {name, color}= category
               const myStyle1= {backgroundColor: `${color}`,
                  padding:' 5px 10px',
                  borderRadius:'10px',
                  textAlign:'center',
                 
          }
              return(<>
              <div className='categoryDiv'>
            <div className={`categoryCircle ${addClass? 'toggledCategoryClass' :null }`}
            style={myStyle1} 
            onClick={()=>{setAddClass(!addClass);
              setCategoryColor(color); 
            setCategoryName(name);
            }}>
             {name}
            </div>
            
                <br/>
         
              </div>
              </>)
              
          }
          )}
           <button className='btn-category' onClick={()=>{setIsNewCategory(!isNewCategory);
          }}>+ New Category</button>
           </div>
          {isNewCategory && 
         <div className='categoryNameContainer'>  
           
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
                  height:'30px',
                  width:'30px',
                  borderRadius:'50%',
                  
          
                 
          }
          
            return (<div >
              
            <div key={id}
           className={`categoryCircle ${addClass? 'toggledCategoryClass' :null} `}
            style={myStyle}
            onClick={()=>{setCategoryColor(code);
              setAddClass(!addClass);
            }}>
             
            </div>
           
            
            </div>)
          })}
          </div>
          </div>}
         
        </div>
        <div className='words'>
          <div className='wordButtons'>
        
          <div><button type='submit'  className='saveButton'> {isEdit? 'edit' :'save'}</button></div>
           </div>
         <input type='text' 
         placeholder='Title'
         className='input-title'
         value={topic}
         onChange={(e)=>setTopic(e.target.value)}></input>
         <br></br>

         <textarea type='text' 
         placeholder='Notes'
         className='notes'
         size='5rem'
         value={text}
         onChange={(e)=>setText(e.target.value)}
         ></textarea>
         <br></br>
        
      </div>
        
          </form>
      </div>
     </> }
      </div>
        

        {showNotes && <article>
      <div>
      </div>
      <div>this is where the notes saved would be mapped out to. its going to show the titles, and a few lines of text in notes with the rest represented as '...'. it would have a delete button and oce tapped on, it goes to an edit page.
      </div>
        </article>
        }
    </section>
  </>);
}

export default App;
