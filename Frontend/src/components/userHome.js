import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Cookie from "js-cookie";
import "./css/home.css"
import Navbar from "./navbar";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
export default function UserHome({ userData }) {
  const [list, setlist] = useState([]);
  const [task, settask] = useState();
  const navigate = useNavigate();
  const logOut = () => {
    Cookies.remove("Cookie")
    navigate("/login")
  };
  
  const handletask = async(i)=>{
    const tokken = Cookie.get('Cookie')
    const response = await axios.post(`http://localhost:8080/CreateTask/${i}`,{desc:task}, {
      headers: {
        Authorization: `Bearer ${tokken}`,
      },
    })
    console.log(task)
    getuser(tokken);
    settask("");
  }
  
  const getuser = async (token) => {
    const response = await axios.get("http://localhost:8080/getTasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setlist(response.data.data.lists);
    console.log(list)
  }
  const createlist = async () => {
    const token = Cookie.get('Cookie')
    const response = await axios.post("http://localhost:8080/list",{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    getuser(token)
  }
  const deletetask = async (id) => {
    const token = Cookie.get('Cookie')
    const response = await axios.delete(`http://localhost:8080/deltask/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    getuser(token)
  }
  
  
  useEffect(() => {
    const token = Cookie.get("Cookie");
    getuser(token);
  }, [])
  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <>
      <Navbar logout={logOut}/>
      <div className="containers">
        <div className="taskss">
          {list.map((listItem) => (
            <div className="list" key={listItem.id}>
              <div className="todo">
                <h1>Your Task</h1>
                <div className="tasks">
                  {listItem.tasks.map((task, index) => (
                    <div className="line">
                      <div className="task" draggable="true" key={index}>
                      <p>
                        {task.desc}
                      </p>
                      <button onClick={()=>deletetask(task._id)}>delete</button>
                      </div>
                    </div>
                  ))}
                  <div className="line">
                    <div className="take">
                      <input type="text" onChange={(e)=>settask(e.target.value)}/>
                      <button onClick={()=>handletask(listItem.sq)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="addlist">
              <button onClick={()=>createlist()}>+</button>
            </div>

        </div>
      </div>
    </>
  );
}
