import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ListItem from './ListItem';
import { v4 as uuidv4 } from 'uuid';
import UpdateItem from './UpdateItem';

function GroceryCart() {


    const [groceryInput, setGroceryInput] = useState("");
    const [groceryList, setGroceryList] = useState([])

    const handleInputChange = (e) => {
        setGroceryInput(e.target.value)
    }

    const insertGroceryItem = () => {
        if(groceryInput.trim() === ''){
            toast.error("Please insert grocery item", {
                position: "top-center",
              });
              return
        }

        
        const newArr = [...groceryList, {item:groceryInput,id:uuidv4(), isChecked: false,isEditing:false}]

        setGroceryList(newArr)

        setGroceryInput('')

        toast.success("You added a grocery!!!");

    }

    const deleteListItem = (id) => {
        const newFilteredArr = groceryList.filter((item) => item.id != id)
        setGroceryList(newFilteredArr)
        toast.success("Deleted list item");
    }
    
    const checkOurItem = (id) => {
        const newFilteredArr = groceryList.map((item)=>{
            if(item.id == id){
                item.isChecked = !item.isChecked
            }

            return item
        })

        setGroceryList(newFilteredArr);
        toast.success("Item checked");
    }

    const allowGroceryItemToUpdate = (id) => {
        const editAllowedList = groceryList.map(item => {
          if(item.id === id) {
            item.isEditing = true;
          }
          return item;
        })
        setGroceryList(editAllowedList);
      }
    
      const updateGroceryItem = (val, id) => {
        const updatedGroceryList = groceryList.map((todo) => {
          if (todo.id === id) {
            todo.item = val;
            todo.isEditing = false;
          }
          return todo;
        });
        setGroceryList(updatedGroceryList);
        toast.success("Todo updated");
        updateLocalStorage(updatedGroceryList);
      }

  return (
    <div>
         {/* Input and Add button */}

         <section>
            <input type="text" value={groceryInput}
            onChange={handleInputChange}
             />
             <button onClick={insertGroceryItem}>Add</button>
         </section>

           {/* Display our list */}

           <section>
            <ul>
            {
                groceryList.map((el)=>{

                    return el.isEditing ? (
                        <UpdateItem
                          key={el.id}
                          id={el.id}
                          updateVal={el.item}
                          updateGroceryItem={updateGroceryItem}
                        />
                      ):(

                    <ListItem 
                    key={el.id}
                    label={el.item}
                    id={el.id}
                    delFunc={deleteListItem}
                    checkedFunc={checkOurItem}
                    isChecked={el.isChecked}
                    updateFunc={allowGroceryItemToUpdate}
                    />
                 )})
                
            }
            </ul>
           </section>
    </div>
  )
}

export default GroceryCart