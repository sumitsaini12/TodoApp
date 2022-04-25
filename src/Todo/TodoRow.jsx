import React, { useState, useEffect } from "react";
import Images from "../Todo/file.jpg";
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const getLocalData = () => {

    const lists = localStorage.getItem("myTodoList");

    if (lists) {
        return JSON.parse(lists);

    } else {
        return [];

    }

};



function TodoRow() {

    const [inputData, setInputData] = useState("");
    const [itmes, setItmes] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);


    const addItem = () => {

        if (!inputData) {
            alert("Plz fill the data");
        }else if(inputData && toggleButton) {
            setItmes(
                itmes.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputData };
                    }
                    return curElem;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {

            const myNumInputData = {

                id: new Date().getTime().toString(),
                name: inputData,
            };

            setItmes([...itmes, myNumInputData]);
            setInputData("");
        };
    };

    const deleteItem = (index) => {

        const updatedItems = itmes.filter((curElem) => {

            return curElem.id !== index;
        });
        setItmes(updatedItems);
    };

    const removeAll = () => {
        setItmes([]);
    };

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(itmes));

    }, [itmes]);

    const editItme = (index) => {

        const item_todo_edited = item.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited);
        setIsEditItem(index);
        setToggleButton(true);
    };


    return (
        <div className="py-12 px-60 h-screen bg-slate-700">
            <div className="bg-blue-500 p-4 rounded-lg text-center item-center space-y-2">
                <img className="ml-52 w-20 h-20 m-x-auto" src={Images} />
                <h2 className="text-4xl font-bold text-center">Add Your List Here</h2>




                <div className="flex ml-32">
                    <input className="border border-gray-900 px-5 py-2" placeholder="Add Todo" value={inputData} onChange={(event) => setInputData(event.target.value)} />

                    {toggleButton ? (<button className="p-2 bg-white border border-gray-900" onClick={addItem}>
                        <AiOutlineEdit className="text-xl text-blue-500 font-fond hover:text-green-500" />
                    </button>) : (<button className="p-2 bg-white border border-gray-900" onClick={addItem}>
                        <AiOutlinePlus className="text-xl text-blue-500 font-fond hover:text-green-500" />
                    </button>)
                    }

                </div>

                {itmes.map((curElem) => {

                    return (
                        <div className="bg-green-500 text-white hover:text-black hover:bg-white rounded-lg flex justify-between" key={curElem.id}>
                            <h3 className="text-xl font-medium pl-8 mt-1">{curElem.name}</h3>
                            <div className="flex pr-2">
                                <button className="px-2 py-2">
                                    <AiOutlineEdit className="text-2xl text-blue-500 font-fond hover:text-green-500" onClick={() => editItme(curElem.id)} />
                                </button>
                                <button className="px-2 py-2">
                                    <MdDelete className="text-2xl text-blue-500 font-fond hover:text-red-500" onClick={() => deleteItem(curElem.id)} />
                                </button>
                            </div>
                        </div>

                    )

                })

                }

                <div>
                    <button className="text-white bg-indigo-700 hover:bg-red-500 px-6 py-2 rounded-lg mt-6" onClick={removeAll}>All Remove</button>
                </div>
            </div>
        </div>


    );
}

export default TodoRow;


