import React, {useState, useEffect, useRef} from "react";
import TextareaAutosize from 'react-textarea-autosize'
// import {Spring} from 'react-spring'
import Alert from './Alert.js'
import {categoryData} from './Category.js'
// import { FaBars } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import {MdAdd } from 'react-icons/md'
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiArrowDropUpLine} from 'react-icons/ri'
import {CgNotes} from'react-icons/cg'



const getLocalstorage=()=>{
  let list= localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}
const getLocalStorage1=()=>{
  let list= localStorage.getItem('categoriesSelected')
  if(list){
    return JSON.parse(localStorage.getItem('categoriesSelected'))
  }else{
    return []
  }
}

function App() {
  const [topic, setTopic] = useState('')
  const [text, setText]= useState('')
  const [list, setList]= useState(getLocalstorage());
  const[copyList, setCopyList] = useState([]);
  const [isAlert, setIsAlert]= useState({state:false, status:'', msg:''})
  const [isEditing, setIsEditing]= useState(false)
  const [editId, setEditId]= useState(null)
  const [categoriesSelected, setCategoriesSelected]= useState(getLocalStorage1());
  const [categoryName, setCategoryName]= useState('');
  const [categoryColor, setCategoryColor]= useState('');
  const [isNewCategory, setIsNewCategory]= useState(false)
  const[addNewNote, setAddNewNote]=useState(false)
  const[showNotes, setShowNotes]= useState(true)
  const [isShowNavToggle, setIsShowNavToggle]=useState(true);
  const [isNotesCategory, setIsNotescategory]=useState(false);
  const [isMenuBar ,setIsMenuBar]= useState(true)
  const[showCategories, setShowCategories]= useState(false);
  

 useEffect(()=>{
   setCopyList(list)
 },[list])

  

 useEffect(()=>{
   localStorage.setItem('list', JSON.stringify(list))
},[list]) 

useEffect(()=>{
   localStorage.setItem('categoriesSelected', JSON.stringify(categoriesSelected))
},[categoriesSelected])

 const removeItem=(id)=>{
    showAlert(true, 'failure', `note deleted`)
    setList(list.filter(item=>item.id !==id))
  setShowNotes(true); 
  setEditId(null);
setAddNewNote(false);
setIsNewCategory(false);
setIsShowNavToggle(true);
setTopic('');
setText('');
setCategoryName('');
  setCategoryColor('');
  setIsEditing(false);

}

 const removeItem1=(id, name)=>{
    showAlert(true, 'failure', `category deleted`)

     setList(list.map(item=>{
    if(item.name===name){
     
      return {...item,  name:'uncategorized', color:'grey' }
 
    }
    return item
  }))
  setCopyList(list);
     setCategoriesSelected(categoriesSelected.filter(item=>item.id !==id))
  setIsEditing(false);
  setIsNotescategory(true);

}

  const filterCategories=(name)=>{
    const myPromise= new Promise((resolve, reject)=>{
      if(list.length>0){
     resolve (setCopyList(list))
      }
    })
    myPromise.then(()=>{
  let newItems = list.filter((item) => item.name === name);
    setCopyList(newItems);
    })
  }
  


const handleSubmit=(e)=>{
e.preventDefault();
if(!topic && !text){
 showAlert(true, 'failure', 'Nothing to save. Note discarded');
 setShowNotes(!showNotes); 
setAddNewNote(!addNewNote);
setIsNewCategory(false);
setCopyList(list);
setIsShowNavToggle(true);
setTopic('');
setText('');
setCategoryName('');
  setCategoryColor('');
  setIsMenuBar(true);
}
 else if ((topic|| text) && isEditing){
  showAlert(true, 'success', `${topic} changed`)
  //editing part
  setList(list.map(item=>{
       if(item.id===editId){ 
         if(item.name==='uncategorized'){
          setCategoryName('uncategorized')
  setCategoryColor('grey')
       }
       else{
        const newCategory={id:new Date().getTime().toString(), name:categoryName, color:categoryColor}
     const uniqueCategories=[...categoriesSelected, newCategory].reduce((a,c)=>{!a.find(v=>v.name===c.name) &&a.push(c);
    return a;
  
  },[])
 
  setCategoriesSelected(uniqueCategories);
       }
         return {...item, title:topic, note:text, name:categoryName, color:categoryColor }
       }
       return item
     }))
     
     setShowNotes(!showNotes); 
      setAddNewNote(!addNewNote);
      setIsShowNavToggle(true);
      setIsEditing(false);
      setIsNewCategory(false)
     setTopic('');
  setText('');
  setCategoryName('');
  setCategoryColor('');
     setEditId(null);
     setIsMenuBar(true);

}else{
  if(categoryColor==='' && categoryName==='' ){

    showAlert(true, 'success', `${topic} added to uncategorized`)
    setCategoryName('uncategorized')
  setCategoryColor('grey')
setShowNotes(!showNotes); 
setAddNewNote(!addNewNote);
setIsNewCategory(false)
setCopyList(list);
setIsShowNavToggle(true);
const newList={id:new Date().getTime().toString(), title:topic, note:text, name:'uncategorized', color:'grey'}

  setList([...list, newList]);

  
  setTopic('');
  setText('');
  setCategoryName('');
  setCategoryColor('');
  setIsMenuBar(true);
   

  }else{
showAlert(true, 'success', `${topic} added to ${categoryName}`)
setShowNotes(!showNotes); 
setAddNewNote(!addNewNote);
setIsNewCategory(false)
setCopyList(list);
setIsShowNavToggle(true);
setIsMenuBar(true);
const newList={id:new Date().getTime().toString(), title:topic, note:text, name:categoryName, color:categoryColor  }
const newCategory={id:new Date().getTime().toString(), name:categoryName, color:categoryColor}

  setList([newList,...list]);
  console.log(list);
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

const editItem=(id)=>{
setIsMenuBar(false)
  const specificItem= list.find(item=>item.id=== id)
  setIsEditing(true);
  setEditId(id);
setShowNotes(false); 
setAddNewNote(true);
setIsShowNavToggle(false);
setIsNewCategory(false);
   setTopic(specificItem.title);
  setText(specificItem.note);
  setCategoryName(specificItem.name);
  setCategoryColor(specificItem.color);
  
 

}

const showAlert = (state=false, status='', msg='')=>{
  setIsAlert({state, status, msg})
  }
// const refContainer= useRef(null);
//  useEffect(()=>{
//     refContainer.current.focus();
//   })

  return (<>
    <section className='section-center' >
      <div className='title'>
      <h2>Notes App</h2>
      </div>
      <div className='section'>
    {isMenuBar && 
    <button className='menu-bar' onClick={()=>{setIsNotescategory(true);
      setIsMenuBar(false);
      }} >
        < FaBars/>
        
      </button>
}
        { isShowNavToggle &&
    <button className='nav-toggle' onClick={()=>{setAddNewNote(!addNewNote);
    setShowNotes(!showNotes);
    setIsNewCategory(false);
    setCopyList(list);
    setIsMenuBar(false);
    setIsShowNavToggle(false);}} >
        <MdAdd/>
      </button>
}
      {isAlert.state && <Alert {...isAlert} removeAlert={showAlert} list={list}/>} 
      {addNewNote && <>
      <div className='form-box' >
       

        <form className='form' onSubmit={handleSubmit} >     
          <h4>Select Category</h4>
          <div className='categories'>
            <div className='category'>
          {categoriesSelected.map(category=>{
              const {name, color}= category
               const myStyle1= {backgroundColor: `${color}`,
                  padding:' 5px 10px',
                  borderRadius:'10px',
                  textAlign:'center',
                  color:'white',
                 
          }
              return(<>
              <div className='categoryDiv'>
            <div className={`categoryCircle `}
            style={myStyle1} 
            onClick={()=>{
              setCategoryColor(color); 
            setCategoryName(name);
            setIsNewCategory(false);
            }}>
             {name}
            </div>
            
                <br/>
         
              </div>
              </>)
              
          }
          )}
           <div className='btn-category' onClick={()=>setIsNewCategory(!isNewCategory)
          }>+ New Category</div>
           </div>
          {isNewCategory && 
         <div className='categoryNameContainer'>  
           
          <input type='text'
              placeholder='Category Name'
              value={categoryName}
              onChange={(e)=>setCategoryName(e.target.value)}
              className='categoryName'
              />
              <div className='colors-Div'>
            <h6>colors</h6>  <div className='dottedLines'></div></div>
          <div className='circles'>
          {categoryData.map((unit)=>{
            const {id, code}= unit
             const myStyle= {backgroundColor: `${code}`,
                  height:'30px',
                  width:'30px',
                  borderRadius:'50%',  

          }
          
            return (<div >
              
            <div key={id}
           className={`categoryCircle `}
            style={myStyle}
            onClick={()=>{setCategoryColor(code)
            }}>
             
            </div>
           
            
            </div>)
          })}
          </div>
          </div>}
         
        </div>
        <div className='words'>
          <div className='wordButtons'>
        
          <div><button type='submit'  className='saveButton' 
         > {isEditing? 'edit' :'save'} </button></div>
           </div>
         <TextareaAutosize
         autoFocus
         cacheMeasurements
         placeholder='Title'
         className='input-title'
         value={topic}
         onChange={(e)=>{setTopic(e.target.value);
         setIsNewCategory(false)}}/>
         <br></br>

         <TextareaAutosize cacheMeasurements
         placeholder='Notes'
         className='notes'
         value={text}
         onChange={(e)=>setText(e.target.value)}
         />
         <br></br>
      </div>
          </form>
      </div>
     </> }
      </div>
        

        {showNotes && <article className='notesPage'>
          <br/> <br/>
         
      {isNotesCategory && <div className='notesCategory'>
        <button className='times-bar ' onClick={()=>{setIsNotescategory(false);
        setIsMenuBar(true);

      }} >
        < FaTimes/>
        
      </button>
         <div style={{display:'flex', justifyContent:'flex-start', margin:'0 0.5rem', paddingTop:'20px'}}><CgNotes className='cgNotes'/>
        <div className={` allNotes`} style={{
                  padding:' 5px 30px',
                  borderRadius:'10px',
                  textAlign:'center',
                color:'black',
                display:'inline-block',
                 cursor:'pointer',
                 backgroundColor:'transparent',
                 marginRight:'1rem',
                 marginTop:'-12px'
                //  width:'50px'
          }}

                  onClick={()=>{setCopyList(list);
                  setIsNotescategory(false);
                  setIsMenuBar(true);}}><h4>All notes</h4></div> </div> <br/>
                   <div className='dottedLines'>&nbsp;&nbsp;&nbsp;</div>
               <div style={{display:'flex', justifyContent:'space-between', margin:'0 0.5rem'}}><h5>All Categories </h5> <RiArrowDropUpLine className='dropDown' onClick={()=>setShowCategories(!showCategories)}/></div>
                {showCategories && <>
         {categoriesSelected.map(category=>{
              const {name, color, id}= category
             
               const myStyle1= {backgroundColor: `${color}`,
                  padding:' 5px 10px',
                  borderRadius:'10px',
                  textAlign:'center',
                   display:'inline-block',
                 cursor:'pointer',
                 color:'white',
                 
                 
          }
              return(
              <div className={`notesCategoryCircle2`}>
              <div className={`notesCategoryCircle`}
            style={myStyle1}   key={id}
            onClick={()=>{
            setCopyList(list); 
            filterCategories(name);
            setIsNotescategory(false);
            setIsMenuBar(true);
           
            }}>
             {name}
             
            </div> 
             <button
                type='button'
                className='delete-btn1'
                onClick={() =>{ removeItem1(id,name);
                  setIsNotescategory(true); 
                 setIsMenuBar(true);
                  setShowNotes(true);
                setAddNewNote(false);
                setIsNewCategory(false);
                setIsShowNavToggle(true);
                }}
              > <FaTrash /></button>
                
              </div>)
         })}

          <div className={`notesCategoryCircle allNotes2`} style={{
                  padding:' 5px 30px',
                  borderRadius:'10px',
                  textAlign:'center',
                color:'white',
                display:'inline-block',
                 cursor:'pointer',
                 backgroundColor:'grey'
                //  width:'50px'
          }}

                  onClick={()=>{setCopyList(list); 
            filterCategories('uncategorized');
                  setIsNotescategory(false);
                  setIsMenuBar(true);}}>uncategorized</div>
                 </>
                 }
          
      </div>}
      <div className='actualNotes' onClick={()=>{setIsNotescategory(false);
      setIsMenuBar(true);}}>{copyList.length<1? <p className='noNotes'>No notes </p>: copyList.map(maps=>{
        const{id, note, title,  color}= maps
        return(<div className='singleNote' key={id} >
          <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
          <div  onClick={()=>{setIsMenuBar(false);
            editItem(id);
          }}>
          <div style={{
            height:'10px',
            width:'10px',
            backgroundColor:`${color}`,
            borderRadius:'50%',
            marginTop:'0',

          }}></div>
         <h4>{(title.length>15)?`${title.substring(0,20)}...` :`${title}`}</h4>
          <p>{(note.length>40)?`${note.substring(0,50)}...` : `${note}`}</p>
        
          
        </div>
        </div >)
        })}
      </div>
        </article>
        }
    </section>
  </>);
}

export default App;
