import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Task from "@/components/Task";

export default function Home() {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [typing, setTyping] = useState('')

  const typer = (e) => {
    setTyping(e.target.value);
  }
  function deleter(index) {
    setData(data.filter((x, idx) => idx !== index));
  }
  const whenChange = (e) => {
    setTask(e.target.value);
  };
  const adder = () => {
    setData([...data, { name: task, isChecked: false, isEditing: false, hasEdit: true}]);
  };
  const edit = (idex) => {
    setData(data.map((x,i) =>{
      if (i!=idex){
      x.isEditing = false
    }
    }))
   setData(data.map((x,i) => {
      if (i==idex){
      return {...x, isEditing:true}
    }
    else return x
  }))
  }
  const complete = (idex) => {
    data[idex].name=typing
   setData(data.map((x,i) => {
      if (i==idex){
      return {...x, isEditing:false}
    }
    else return x
  }))
  }


  const handleCheck = (index) => {
    setData(
      data.map((el, id) => {
        if (id === index) {
          el.isChecked = !el.isChecked;
        }
        return el;
      })
    );
    data[index].hasEdit=!data[index].hasEdit;
  };

  return (
    <div className={styles.everything}>
      <div className={styles.top}>
      <p className={styles.title}>THE LIST </p>
      <div className={styles.topright}>
      <p className={styles.title}>{data.filter((xboom) => xboom?.isChecked == true).length}/{data.length}</p>
      <img width='100px' src='dance.gif'></img>
      </div>
      </div>
      <div className={styles.bottom}>
      {data.map((x, index) => {
        if (x.hasEdit==true){
          if (x.isEditing==false){
          return (
            <div key={index} className={styles.task}>
            <div className={styles.tasktext}>
              <img width='50px' src='hoho.png'></img>
            <p className={styles.tasktext}>{x.name}</p>
            </div>
            <div className={styles.taskbuttons}>
            <button onClick={() => deleter(index)} className={styles.button}>delete</button>
            <button onClick={()=>edit(index)} className={styles.button}>
              edit
            </button>
          <input
              type="checkbox"
              checked={x.isChecked}
              onChange={() => handleCheck(index)}
              className={styles.checkbox}
            ></input>
            </div>
          </div>)
          } else {
            return(
            <div key={index} className={styles.task}>
                <input placeholder={x.name} onChange={typer}></input>
                <button onClick={()=>complete(index)} className={styles.button}>complete</button>
                <p></p>
                
            </div>
          )
        }
      } else {
        return (
          <div key={index} className={styles.task}>
            <div className={styles.tasktext}>
            <img width='50px' src='hehe.png'></img>
          <p className={styles.tasktext}>{x.name}</p>
          </div>
          <div className={styles.taskbuttons}>
          <button onClick={() => deleter(index)} className={styles.button}>delete</button>
          <p className={styles.buttonnull}>
            edit
          </p>
        <input
            type="checkbox"
            checked={x.isChecked}
            onChange={() => handleCheck(index)}
            className={styles.checkbox}
          ></input>
          </div>
        </div>)
      }
    })}
    </div>
      <input
        type="text"
        placeholder="write sometin here
        "
        onChange={whenChange}
      ></input>
      <button onClick={adder}>add to list</button>
    </div>
  );
}
