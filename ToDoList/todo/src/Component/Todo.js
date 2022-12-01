import React, { useEffect, useState } from 'react'
import "../App.css"

const getLocalItems =()=>{
    let list = localStorage.getItem('list')
    console.log(list)
    if(list){
        return JSON.parse(localStorage.getItem('list'))
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData,setInputData]= useState('');
    const [item,setItem]=useState(getLocalItems());
    const [toggleBtn,setToggleBtn] = useState(true);
    const [isEditItem,setIsEditItem]=useState(null)
    const addItem = () => {
            if(!inputData){ alert('Add Any ToDo Here:')}
            else if(inputData && !toggleBtn){
                    setItem(
                        item.map((elem)=>{
                            if(elem.id === isEditItem){
                                return { ...elem,name:inputData}
                            }
                            return elem;
                        })
                    )
                setToggleBtn(true)
                setInputData('')
                setIsEditItem(null)
            }
            else{
                const allInputData ={ id:new Date().getTime().toString(), name :inputData}
                setItem([...item,allInputData]);
                setInputData('')
            }    
    }
    const deleteItem = (index)=> {
        const updateItem = item.filter((elem,ind)=>{
            return index !== elem.id;
        });
        setItem(updateItem);
    }
    const editItem=(id)=>{
        let newEditItem = item.find((elem)=>{
            return elem.id === id
        })
        console.log(newEditItem)
        setToggleBtn(false);
        setInputData(newEditItem.name)
        setIsEditItem(id)
    }
    const removeAll = () =>{
        setItem([]);
    }
    useEffect(() => {
        localStorage.setItem('list',JSON.stringify(item))
      
    }, [item])
    
  return (
    <>
        <div className="main-div">
            <div className='child-div'>
                <figure>
                    <img src='/todo.png' alt='todo' className='logo'/>
                    <figcaption> Add Your Todo Here:</figcaption>
                </figure>
                <div>
                    <input type='text'placeholder=' Add Items ..' 
                    value={inputData}
                     onChange={(e)=>setInputData(e.target.value)}/>
                     {
                        toggleBtn ? <button type='submit' onClick={addItem}><i class="fa-solid fa-plus"></i></button>: <button type='submit' onClick={addItem}>
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                     }
                </div>
                <div className='show-items'>
                    {
                        item.map((elem) => {
                            return(
                                <div className='each-items'  key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className='todo-btn'>
                                    <i class="fa-regular fa-pen-to-square" onClick={()=>editItem(elem.id)}></i>
                                    <i class="fa-solid fa-trash" onClick={()=>deleteItem(elem.id)}></i>
                                    </div>    
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <button className='removeAll' onClick={removeAll}><span>Remove All</span></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo