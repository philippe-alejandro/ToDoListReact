// --> Add modal which can disappear by clicking outside of it and using a close button: 
// https://www.youtube.com/watch?v=Hl7o4tJQzPs
// https://github.com/collegewap/yt-react-modal

import React, { useEffect, useRef } from "react";
import "./appStyle.css";
import { useState } from "react";
import ReactDom from "react-dom";
import "jquery";

// content
//  taskModal
//  projModal 
//  searchModal
//  searchModalWebApi
//  submitTaskModal
//  content21
//  content22
//  content23

function App() {
  // localStorage.clear();
  return (
    <div id="mainContainer">
      <Content21 />
      <Content22 />
      <Content23 />
    </div>
    )
}

function Content21 () {
  const [showCreateTask, setCreateTaskModal] = useState(false);
  const [showCreateProj, setCreateProjModal] = useState(false);

  return (
    <div id="content21">        
      <button id="taskCreateBtn" data-testid="taskCreateBtn" className="createBtn" type="button" onClick={()=>{setCreateTaskModal(true)}}>Create Task</button>
      <button id="projCreateBtn" data-testid="projCreateBtn" className="createBtn" type="button" onClick={()=>{setCreateProjModal(true)}}>Create Project</button>
      {showCreateTask && <CreateTaskModal handleClose={()=>{setCreateTaskModal(false)}}/>} 
      {showCreateProj && <CreateProjModal handleClose={()=>{setCreateProjModal(false)}}/>} 
    </div>
  )
}

function allStorage() {
  const itemList = [];
  const taskList = [];
  const projList = [];

  const items = Object.keys(localStorage);
  let i = items.length; 
  
  while ( i-- ) {
    itemList.push(localStorage.getItem(items[i]));
  };
  for (let j = 0; j < itemList.length; j++) {
    // console.log(Object.values(JSON.parse(itemList[j])));
    if (Object.values(JSON.parse(itemList[j]))[0] !== undefined && Object.values(JSON.parse(itemList[j]))[0].includes('- Task')) {
      taskList.push(JSON.parse(itemList[j]));
    } else if (Object.values(JSON.parse(itemList[j]))[0] !== undefined && Object.values(JSON.parse(itemList[j]))[0].includes('- Proj')) {
      projList.push(JSON.parse(itemList[j]));
    } else {
      continue;
    }
  }

  console.log(projList, taskList);
  return [itemList, projList, taskList];
}

function TaskSubmitBtnModal ({handleClose, show}) {
  const showHideClassName = show ? "displayBlock" : "displayNone";
  return (
    <div className={showHideClassName} id="submitTaskModal">
      <div id="submitTaskModalDiv">
        <div id="closeBtnSubmitTaskDiv">
          <span className="closeBtnSubmitTask" onClick={handleClose}> &times; </span>
        </div>

        <p id="submitTaskModalDivTitle">There's no project with such name. First, you have to create a project with that name if you want to assign a task to it.</p>
      </div>
    </div>
  )
}

function ExistingTaskName ({handleClose, show}) {
  const showHideClassName = show ? "displayBlock" : "displayNone";
  return (
    <div className={showHideClassName} id="repeatedTaskModal">
      <div id="repeatedTaskModalDiv">
        <div id="closeBtnRepeatedTaskDiv">
          <span className="closeBtnRepeatedTask" onClick={handleClose}> &times; </span>
        </div>

        <p id="repeatedTaskModalDivTitle">This task name already exists. Please choose another one.</p>
      </div>
    </div>
  )
}

function CreateTaskModal ({handleClose}) {
  const [taskObj, setTaskObj] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStDate, setTaskStDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [taskProj, setTaskProj] = useState("");
  const [taskProjModal, setTaskProjModal] = useState(false);
  const [repeatedTaskModal, setRepeatedTaskModal] = useState(false);
  const [projectNames, setProjectNames] = useState([]);
  const [taskNames, setTaskNames] = useState([]);
  const projectValues = allStorage()[1];
  const taskValues = allStorage()[2];
  const [listenerLookProj, setListenerLookProj] = useState(false);
  const [listenerLookTask, setListenerLookTask] = useState(false);
  
  const refForm = useRef();
  
  const submitTask = (e) => {
    e.preventDefault();

    const taskObj = {"taskName":`${taskName} - Task`,
    "taskDescription": `${taskDesc} - Task`,
    "taskStartDate": `${taskStDate} - Task`,
    "taskEndDate": `${taskEndDate} - Task`,
    "taskProject": `${taskProj} - Task`,
    "taskStatus": `To Do - Task`
    };

    setTaskObj(taskObj);
    /*useEffect(()=> {
      console.log(taskValues);
      console.log(projectValues);
    }, [taskValues, projectValues])*/
    // look for project names

    for (let i = 0; i < projectValues.length; i++) {
      // console.log(projectValues[i]);
      setProjectNames((oldArray) => [...oldArray,  projectValues[i]["projName"].replace(/\s/g, '').toLowerCase().replace('-proj', '')]);
    };  
    //console.log(projectNames);
    // look for task names
    for (let i = 0; i < taskValues.length; i++) {
      // console.log(projectValues[i]);
      setTaskNames((oldArray) => [...oldArray,  taskValues[i]["taskName"].replace(/\s/g, '').toLowerCase().replace('-task', '')]);
    }
    
    dragDropTasks;

    $('#taskModal').css({
      display: "none"
    });
  }

  useEffect(() => {
    setTaskProjModal(false);
    if (projectNames.indexOf(taskProj.replace(/\s/g, '').toLowerCase()) !== -1 && taskProj.length !== 0) {
      console.log("project exists for this task", projectNames.indexOf(taskProj.replace(/\s/g, '').toLowerCase()));
      localStorage.setItem(taskObj[Object.keys(taskObj)[0]], JSON.stringify(taskObj));
      setTaskProjModal(false);
    } else if (projectNames.indexOf(taskProj.replace(/\s/g, '').toLowerCase()) === -1 && taskProj.length !== 0) {
      console.log("project doesn't exist for this task");
      setTaskProjModal(true);
    };
  }, [taskObj]);  

  useEffect(() => {
    setRepeatedTaskModal(false);
    if (taskNames.indexOf(taskName.replace(/\s/g, '').toLowerCase()) > -1 && taskName.length !== 0 /*&& !listenerLookTask*/) {
      console.log("Not Available! Task Name already taken.");
      setRepeatedTaskModal(true);
      //setListenerLookTask(true);
    } else if (taskNames.indexOf(taskName.replace(/\s/g, '').toLowerCase()) === -1 && taskName.length !== 0 /*&& listenerLookTask*/) {
      console.log("Available! Task Name does not exist yet.");
      setRepeatedTaskModal(false);
    }
  }, [taskObj])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refForm.current && !refForm.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleClose]);

  /*useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);*/

  return ReactDom.createPortal(
    <div id="taskModal">
      <div id="taskForm" ref={refForm}>
        <div id="taskNameDiv">
          <input id="taskNameInput" value={taskName} placeholder="Task Name ..." onChange={(e)=>setTaskName(e.target.value)} required></input>
        </div>
        <div id="taskDescriptionDiv">
          <textarea id="textDescriptionInput" value={taskDesc} placeholder="Task Description..." onChange={(e)=>setTaskDesc(e.target.value)} required></textarea>
        </div>
        <div id="taskStartDateDiv">
          <h3>Start Date</h3>
          <input id="taskStartDateInput" value={taskStDate} onChange={(e)=>setTaskStDate(e.target.value)} type="date" required></input>
        </div>
        <div id="taskEndDateDiv">
          <h3>End Date</h3>
          <input id="taskEndDateInput" value={taskEndDate} onChange={(e)=>setTaskEndDate(e.target.value)} type="date" required></input>
        </div>
        <div id="taskProjectDiv">
          <input id="taskProjectInput" value={taskProj} onChange={(e)=>setTaskProj(e.target.value)} placeholder="Task Project..." required></input>
        </div>
        <button id="taskFormBtn" type="submit" onClick={submitTask}>
          Submit
        </button>
      </div>
                                                        
      <TaskSubmitBtnModal show={taskProjModal} handleClose={()=>{setTaskProjModal(false)}}/>
      <ExistingTaskName show={repeatedTaskModal} handleClose={()=>{setRepeatedTaskModal(false)}}/>
    </div>,
    document.getElementById("mainContainer")
  )
}

function ExistingProjName ({handleClose, show}) {
  const showHideClassName = show ? "displayBlock" : "displayNone";
  return (
    <div className={showHideClassName} id="repeatedProjModal">
      <div id="repeatedProjModalDiv">
        <div id="closeBtnRepeatedProjDiv">
          <span className="closeBtnRepeatedProj" onClick={handleClose}> &times; </span>
        </div>

        <p id="repeatedProjModalDivTitle">This project name already exists. Please choose a new one.</p>
      </div>
    </div>
  )
}

function CreateProjModal ({handleClose}) {
  const [projObj, setProjObj] = useState({});
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projStDate, setProjStDate] = useState("");
  const [projEndDate, setProjEndDate] = useState("");
  const [projValues, setProjValues] = useState(allStorage()[1]);
  const [projNames, setProjNames] = useState([]);
  const [repeatedProjModal, setRepeatedProjModal] = useState(false);

  const refForm = useRef();

  const submitProj = (e) => {
    e.preventDefault();
    const projObj = {"projName": `${projName} - Proj`,
    "projDescription": `${projDesc} - Proj`,
    "projStartDate": `${projStDate} - Proj`,
    "projEndDate": `${projEndDate} - Proj`
    };
    setProjObj(projObj);
    console.log(projObj);
    allStorage();

    for (let i = 0; i < projValues.length; i++) {
      // console.log(projectValues[i]);
      setProjNames((oldArray) => [...oldArray,  projValues[i]["projName"].replace(/\s/g, '').toLowerCase().replace('-proj', '')]);
    }; 
    dragDropTasks();

    $('#projModal').css({
      display: "none"
    });
  
  };

  useEffect(() => {
    console.log(projNames.indexOf(projName.replace(/\s/g, '').toLowerCase()));
    setRepeatedProjModal(false);
    if (projNames.indexOf(projName.replace(/\s/g, '').toLowerCase()) !== -1 && projName.length !== 0) {
      console.log("Not Available! Proj Name already exists.");
      setRepeatedProjModal(true);
    } else if (projNames.indexOf(projName.replace(/\s/g, '').toLowerCase()) === -1 && projName.length !== 0) {
      console.log("Available! Proj Name does not exist yet.");
      localStorage.setItem(projObj[Object.keys(projObj)[0]], JSON.stringify(projObj));
      setRepeatedProjModal(false);
    }
  }, [projObj]) 

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refForm.current && !refForm.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleClose]);
  /*
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); */

  return ReactDom.createPortal(
    <div id="projModal">
      <form id="projForm" ref={refForm}>
        <div id="projNameDiv">
          <input id="projNameInput" placeholder="Project Name ..." onChange={(e)=>setProjName(e.target.value)} required></input>
        </div>
        <div id="projDescriptionDiv">
          <textarea id="projDescriptionInput" placeholder="Project Description ..." onChange={(e)=>setProjDesc(e.target.value)} required></textarea>
        </div>
        <div id="projStartDateDiv">
          <h3>Start Date</h3>
          <input id="projStartDateInput" type="date" onChange={(e)=>setProjStDate(e.target.value)} required></input>
        </div>
        <div id="projEndDateDiv">
          <h3>End Date</h3>
          <input id="projEndDateInput" type="date" onChange={(e)=>setProjEndDate(e.target.value)} required></input>
        </div>
        <div id="projProjectDiv"></div>
        <button id="projFormBtn" type="button" onClick={submitProj}>
          Submit
        </button>
      </form>

      <ExistingProjName show={repeatedProjModal} handleClose={()=>{setRepeatedProjModal(false)}} />
    </div>,
    document.getElementById("mainContainer")
  )
}

function SearchValueTaskProj({handleClose}) {
  const refModalDiv = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refModalDiv.current && !refModalDiv.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleClose]);
  
  return ReactDom.createPortal(
    <div id="searchTaskProjModal">
      <div id="searchTaskProjTitleContainer" ref={refModalDiv}>
        <h1 id="searchTaskProjTitle">        
          No such value in storage. 
        </h1>
      </div>
    </div>,
    document.getElementById("mainContainer")
  )
}

function Content22 () {
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const [suggestedProjs, setSuggestedProjs] = useState([]);
  const [searchedTask, setSearchedTask] = useState("");
  const [searchedProj, setSearchedProj] = useState("");
  const [showTaskSearchList, setShowTaskSearchList] = useState("displayNone");
  const [showProjSearchList, setShowProjSearchList] = useState("displayNone");
  const [showSearchTaskProjModal, setSearchTaskProjModal] = useState(false);
  const inputSearchTask = useRef(null);
  const inputSearchProj = useRef(null);
  const liTask = useRef(null);
  const liProj = useRef(null);  

  // <<------------ Tasks List ------------>>
  useEffect(() => {
    if (suggestedTasks.length === 0) {
      setShowTaskSearchList("displayNone");
    } else {
      console.log(suggestedTasks);
    }
  }, [suggestedTasks])

  let taskNames = allStorage()[2].filter((a) => {
    if (a.taskName !== undefined && a.taskName !== "") {
      return a.taskName;
    }
  });
  
  let taskNamesV2 = [];
  for (let i = 0; i < taskNames.length; i++) {
    taskNamesV2.push(`${i})${taskNames[i].taskName.replace(' - Task', '')}`);
  }

  taskNames = taskNames.map(task =>  task.taskName.replace(' - Task', '').replace(/\s/g, '').toLowerCase());  
  
  const searchTaskFunc = (e) => {
    if (e.target.value.length > 0) {
      // e.preventDefault();
      setShowTaskSearchList("displayBlock");
      setSearchedTask(e.target.value);
      let indexes = [];
      let suggestedTaskArray = taskNames.filter((task) => {
        taskNames.indexOf(task);
        let taskString = task.replace(/\s/g, '').toLowerCase();
        if (taskString.startsWith(e.target.value.replace(/\s/g, '').toLowerCase())) {
          indexes.push(taskNames.indexOf(task));
        }
        return taskString.startsWith(e.target.value.replace(/\s/g, '').toLowerCase())
      })

      let suggestedTaskArrayV2 = [];
      const regex = /\)(.+)/;
      for (let i = 0; i < indexes.length; i++) {
        suggestedTaskArrayV2.push(regex.exec(taskNamesV2[indexes[i]])[1]);
      }
      // console.log(suggestedTaskArrayV2);
      setSuggestedTasks(suggestedTaskArrayV2);
    } else if (e.target.value.length === 0 || suggestedTasks.length === 0) {
      // console.log(e.target.value.length);
      setShowTaskSearchList("displayNone");
    }
  }
  // <<------------ Projects List ------------>>
  useEffect(() => {
    if (suggestedProjs.length === 0) {
      setShowProjSearchList("displayNone");
    } else {
      // console.log(suggestedProjs)
    }
  }, [suggestedProjs])

  let projNames = allStorage()[1].filter((a) => {
    if (a.projName !== undefined && a.projName !== "") {
      return a.projName;
    }
  });

  let projNamesV2 = [];
  for (let i = 0; i < projNames.length; i++) {
    projNamesV2.push(`${i})${projNames[i].projName.replace(' - Proj', '')}`);
  }

  projNames = projNames.map(a =>  a.projName.replace(' - Proj', '').replace(/\s/g, '').toLowerCase());  
  console.log(projNames);
  const searchProjFunc = (e) => {
    if (e.target.value.length > 0) {
      // e.preventDefault();
      setShowProjSearchList("displayBlock");
      // console.log(showProjSearchList);
      setSearchedProj(e.target.value);
      // console.log(e.target.value);
      let indexes = [];
      let suggestedProjArray = projNames.filter((proj) => {
        projNames.indexOf(proj);
        let projString = proj.replace(/\s/g, '').toLowerCase();
        if (projString.startsWith(e.target.value.replace(/\s/g, '').toLowerCase())) {
          indexes.push(projNames.indexOf(proj));
        }
        return projString.startsWith(e.target.value.replace(/\s/g, '').toLowerCase())
      })
      
      // console.log(indexes);

      let suggestedProjArrayV2 = [];
      const regex = /\)(.+)/;
      for (let i = 0; i < indexes.length; i++) {
        suggestedProjArrayV2.push(regex.exec(projNamesV2[indexes[i]])[1]);
      }
      // console.log(suggestedProjArrayV2);
      setSuggestedProjs(suggestedProjArrayV2);
    } else if (e.target.value.length === 0 || suggestedProjs.length === 0) {
      // console.log(e.target.value.length);
      setShowProjSearchList("displayNone");
    }
  }

  // <<------------ Search Task Btn Function ------------>>
  const searchTaskBtnFunc = (e) => {
    e.preventDefault();
    const currentInputValue = inputSearchTask.current.value.toLowerCase().replace(/\s/g, '');
    console.log(taskNames);
    console.log(currentInputValue);
    console.log(taskNames.indexOf(currentInputValue));
    if (taskNames.indexOf(currentInputValue) > -1 && currentInputValue.length > 0) {
      const objKeys = ["Name:", "Description:", "Start Date:", "End Date:", "Belongs To:"];
      const inputText = inputSearchTask.current.value;
      const elementPosTask = taskNames.indexOf(inputText.replace(/\s/g, '').toLowerCase());
      // --> possible spot to position the searchTaskBtnFunc function
      if (elementPosTask !== -1 && inputText.length > 0 && ((!document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && !document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {
        $(".tbTaskRow").empty();
        document.querySelector("#searchedTaskDiv").classList.add("displayBlock");
        document.querySelector("#content23").classList.add("displayBlock");
        // Add data to the table
        const taskTableRows = document.getElementsByClassName("tbTaskRow");
        const taskSelectedValues = Object.values(allStorage()[2][elementPosTask]);
        for (let i = 0; i < taskTableRows.length; i++) {
          let tbDataPoint1 = document.createElement("td");
          tbDataPoint1.setAttribute('class', 'tbDataTask');
          tbDataPoint1.setAttribute('data-testid', 'tbDataTask');
          tbDataPoint1.appendChild(document.createTextNode(objKeys[i]));
          let tbDataPoint2 = document.createElement("td");
          console.log(objKeys[i]);
          if (objKeys[i] === "Description:") {
            tbDataPoint2.setAttribute('class', 'tbDataTask');
            tbDataPoint2.setAttribute('data-testid', 'tbDataTask');
            tbDataPoint2.classList.add('Description');
            tbDataPoint2.appendChild(document.createTextNode(taskSelectedValues[i].replace(' - Task', '')));
          } else {
            tbDataPoint2.setAttribute('class', 'tbDataTask');
            tbDataPoint2.setAttribute('data-testid', 'tbDataTask');
            tbDataPoint2.appendChild(document.createTextNode(taskSelectedValues[i].replace(' - Task', '')));  
          }
          // console.log(tbDataPoint1, tbDataPoint2);
          taskTableRows[i].append(tbDataPoint1, tbDataPoint2);
        }

        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        document.querySelector("#searchedTaskDiv").classList.add("displayBlock");
        $('#searchedTaskDiv').css({
          'grid-column': '1 / 3',
          'grid-row': '1 / 2'
        });
      } else if (elementPosTask !== -1 && inputText.length > 0 && ((!document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {  
          $('#content21').css({
            'grid-column': '1 / 2', 
            'grid-row': '1 / 2'
          });
          $('#content22').css({
            'grid-column': '1 / 2', 
            'grid-row': '2 / 3'
          });
          document.querySelector("#searchedProjDiv").classList.remove("displayBlock");
          $('#searchedTaskDiv').css({
            'grid-column': '1 / 3',
            'grid-row': '1 / 2'
          });
      } else if (elementPosTask !== -1 && inputText.length > 0 && !document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")) {
        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        document.querySelector("#searchedProjDiv").classList.add("displayBlock");
        $('#searchedProjDiv').css({
          'grid-column': '2 / 3',
          'grid-row': '1 / 2'
        });
        $('#searchedTaskDiv').css({
          'grid-column': '1 / 2',
          'grid-row': '1 / 2'
        });
      } else if (elementPosTask !== -1 && inputText.length > 0 && ((document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && !document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {
        $(".tbTaskRow").empty();
        document.querySelector("#searchedTaskDiv").classList.add("displayBlock");
        document.querySelector("#content23").classList.add("displayBlock");
        // Add data to the table
        const taskTableRows = document.getElementsByClassName("tbTaskRow");
        const taskSelectedValues = Object.values(allStorage()[2][elementPosTask]);
        for (let i = 0; i < taskTableRows.length; i++) {
          let tbDataPoint1 = document.createElement("td");
          tbDataPoint1.setAttribute('class', 'tbDataTask');
          tbDataPoint1.setAttribute('data-testid', 'tbDataTask');
          tbDataPoint1.appendChild(document.createTextNode(objKeys[i]));
          let tbDataPoint2 = document.createElement("td");
          console.log(objKeys[i]);
          if (objKeys[i] === "Description:") {
            tbDataPoint2.setAttribute('class', 'tbDataTask');
            tbDataPoint2.setAttribute('data-testid', 'tbDataTask');
            tbDataPoint2.classList.add('Description');
            tbDataPoint2.appendChild(document.createTextNode(taskSelectedValues[i].replace(' - Task', '')));
          } else {
            tbDataPoint2.setAttribute('class', 'tbDataTask');
            tbDataPoint2.setAttribute('data-testid', 'tbDataTask');
            tbDataPoint2.appendChild(document.createTextNode(taskSelectedValues[i].replace(' - Task', '')));  
          }
          // console.log(tbDataPoint1, tbDataPoint2);
          taskTableRows[i].append(tbDataPoint1, tbDataPoint2);
        }

        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        document.querySelector("#searchedTaskDiv").classList.add("displayBlock");
        $('#searchedTaskDiv').css({
          'grid-column': '1 / 2',
          'grid-row': '1 / 2'
        });
        document.querySelector("#searchedProjDiv").classList.add("displayBlock");
        $('#searchedProjDiv').css({
          'grid-column': '2 / 3',
          'grid-row': '1 / 2'
        });
      } else if (elementPosTask !== -1 && inputText.length > 0 && (document.querySelector("#searchedProjDiv").classList.contains("displayBlock")  && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock"))) {
        $(".tbTaskRow").empty();
        document.querySelector("#searchedTaskDiv").classList.add("displayBlock");
        document.querySelector("#content23").classList.add("displayBlock");
        // Add data to the table
        const taskTableRows = document.getElementsByClassName("tbTaskRow");
        const taskSelectedValues = Object.values(allStorage()[2][elementPosTask]);
        for (let i = 0; i < taskTableRows.length; i++) {
          let tbDataPoint1 = document.createElement("td");
          tbDataPoint1.setAttribute('class', 'tbDataTask');
          tbDataPoint1.setAttribute('data-testid', 'tbDataTask');
          tbDataPoint1.appendChild(document.createTextNode(objKeys[i]));
          let tbDataPoint2 = document.createElement("td");
          console.log(objKeys[i]);
          if (objKeys[i] === "Description:") {
            tbDataPoint2.setAttribute('class', 'tbDataTask');
            tbDataPoint2.setAttribute('data-testid', 'tbDataTask');
            tbDataPoint2.classList.add('Description');
            tbDataPoint2.appendChild(document.createTextNode(taskSelectedValues[i].replace(' - Task', '')));
          } else {
            tbDataPoint2.setAttribute('class', 'tbDataTask');
            tbDataPoint2.setAttribute('data-testid', 'tbDataTask');
            tbDataPoint2.appendChild(document.createTextNode(taskSelectedValues[i].replace(' - Task', '')));  
          }
          // console.log(tbDataPoint1, tbDataPoint2);
          taskTableRows[i].append(tbDataPoint1, tbDataPoint2);
        }

        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        document.querySelector("#searchedTaskDiv").classList.add("displayBlock");
        $('#searchedTaskDiv').css({
          'grid-column': '1 / 2',
          'grid-row': '1 / 2'
        });
        $('#searchedProjDiv').css({
          'grid-column': '2 / 3',
          'grid-row': '1 / 2'
        });
      }
    } else {
      setSearchTaskProjModal(true); 
    }
  }

  // <<------------ Search Proj Btn Function ------------>>
  const searchProjBtnFunc = (e) => {
    const currentInputValue = inputSearchProj.current.value.toLowerCase().replace(/\s/g, '');;
    if (projNames.indexOf(currentInputValue) > -1 && currentInputValue.length > 0) {

      const objKeys = ["Name:", "Description:", "Start Date:", "End Date:"];
      const inputText = inputSearchProj.current.value;
      let projNamesV3 = allStorage()[1].filter((a) => {
        if (a.projName !== undefined && a.projName !== "") {
          return a.projName;
        }
      });
      projNamesV3 = projNamesV3.map(a =>  a.projName.replace(' - Proj', '').toLowerCase());  
      const elementPosProj = projNames.indexOf(inputText.replace(/\s/g, '').toLowerCase());
      document.querySelector("#content231Item1").innerHTML = projNamesV3[elementPosProj];
      if (elementPosProj !== -1 && inputText.length > 0 && !document.querySelector("#searchedTaskDiv").classList.contains("displayBlock") && !document.querySelector("#searchedProjDiv").classList.contains("displayBlock")) {
        $(".tbProjRow").empty();
        document.querySelector("#searchedProjDiv").classList.add("displayBlock");
        document.querySelector("#content23").classList.add("displayBlock");
        document.querySelector("#content231").classList.add("displayBlock");
        // Add data to the table
        const projTableRows = document.getElementsByClassName("tbProjRow");
        const projSelectedValues = Object.values(allStorage()[1][elementPosProj]);
        // console.log(allStorage()[1][elementPosProj]);
        for (let i = 0; i < projTableRows.length; i++) {
          // console.log(objKeys[i], projSelectedValues[i]);
          let tbDataPoint1 = document.createElement("td");
          tbDataPoint1.setAttribute('class', 'tbDataProj');
          tbDataPoint1.setAttribute('data-testid', 'tbDataProj');
          tbDataPoint1.appendChild(document.createTextNode(objKeys[i]));
          let tbDataPoint2 = document.createElement("td");
          console.log(objKeys[i]);
          if (objKeys[i] === "Description:") {
            tbDataPoint2.setAttribute('class', 'tbDataProj');
            tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
            tbDataPoint2.classList.add('Description');
            tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
          } else {
            tbDataPoint2.setAttribute('class', 'tbDataProj');
            tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
            tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
          }
          // console.log(tbDataPoint1, tbDataPoint2);
          projTableRows[i].append(tbDataPoint1, tbDataPoint2);
        }
        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        document.querySelector("#searchedProjDiv").classList.add("displayBlock");
        $('#searchedProjDiv').css({
          'grid-column': '1 / 3',
          'grid-row': '1 / 2'
        });
      } else if (elementPosProj !== -1 && inputText.length > 0 && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock") && !document.querySelector("#searchedProjDiv").classList.contains("displayBlock")) {
        $(".tbProjRow").empty();
        document.querySelector("#searchedProjDiv").classList.add("displayBlock");
        document.querySelector("#content23").classList.add("displayBlock");
        document.querySelector("#content231").classList.add("displayBlock");
        // Add data to the table
        const projTableRows = document.getElementsByClassName("tbProjRow");
        const projSelectedValues = Object.values(allStorage()[1][elementPosProj]);
        // console.log(allStorage()[1][elementPosProj]);
        for (let i = 0; i < projTableRows.length; i++) {
          // console.log(objKeys[i], projSelectedValues[i]);
          let tbDataPoint1 = document.createElement("td");
          tbDataPoint1.setAttribute('class', 'tbDataProj');
          tbDataPoint1.setAttribute('data-testid', 'tbDataProj');
          tbDataPoint1.appendChild(document.createTextNode(objKeys[i]));
          let tbDataPoint2 = document.createElement("td");
          console.log(objKeys[i]);
          if (objKeys[i] === "Description:") {
            tbDataPoint2.setAttribute('class', 'tbDataProj');
            tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
            tbDataPoint2.classList.add('Description');
            tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
          } else {
            tbDataPoint2.setAttribute('class', 'tbDataProj');
            tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
            tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
          }
          // console.log(tbDataPoint1, tbDataPoint2);
          projTableRows[i].append(tbDataPoint1, tbDataPoint2);
        }

        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        $('#searchedTaskDiv').css({
          'grid-column': '1 / 2',
          'grid-row': '1 / 2'
        });
        document.querySelector("#searchedProjDiv").classList.add("displayBlock");
        $('#searchedProjDiv').css({
          'grid-column': '2 / 3',
          'grid-row': '1 / 2'
        });
      } else if (elementPosProj !== -1 && inputText.length > 0 && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock") && document.querySelector("#searchedProjDiv").classList.contains("displayBlock")) {
        $(".tbProjRow").empty();
        document.querySelector("#searchedProjDiv").classList.add("displayBlock");
        document.querySelector("#content23").classList.add("displayBlock");
        document.querySelector("#content231").classList.add("displayBlock");
        // Add data to the table
        const projTableRows = document.getElementsByClassName("tbProjRow");
        const projSelectedValues = Object.values(allStorage()[1][elementPosProj]);
        // console.log(allStorage()[1][elementPosProj]);
        for (let i = 0; i < projTableRows.length; i++) {
          // console.log(objKeys[i], projSelectedValues[i]);
          let tbDataPoint1 = document.createElement("td");
          tbDataPoint1.setAttribute('class', 'tbDataProj');
          tbDataPoint1.setAttribute('data-testid', 'tbDataProj');
          tbDataPoint1.appendChild(document.createTextNode(objKeys[i]));
          let tbDataPoint2 = document.createElement("td");
          console.log(objKeys[i]);
          if (objKeys[i] === "Description:") {
            tbDataPoint2.setAttribute('class', 'tbDataProj');
            tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
            tbDataPoint2.classList.add('Description');
            tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
          } else {
            tbDataPoint2.setAttribute('class', 'tbDataProj');
            tbDataPoint2.setAttribute('data-testid', 'tbDataProj');
            tbDataPoint2.appendChild(document.createTextNode(projSelectedValues[i].replace(' - Proj', '')));
          }
          // console.log(tbDataPoint1, tbDataPoint2);
          projTableRows[i].append(tbDataPoint1, tbDataPoint2);
        }

        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        $('#searchedTaskDiv').css({
          'grid-column': '1 / 2',
          'grid-row': '1 / 2'
        });
        $('#searchedProjDiv').css({
          'grid-column': '2 / 3',
          'grid-row': '1 / 2'
        });
      }
      
      dragDropTasks();
    } else {
      setSearchTaskProjModal(true);
    }
  }

  // <<------------ Copies name of task in input when <li> element is clicked -------------->>
  const liTaskFunc = (e) => {
    e.preventDefault();
    // console.log(e.target.innerHTML);
    inputSearchTask.current.value = e.target.innerHTML;
  }
  // <<------------ Copies name of project in input when <li> element is clicked -------------->>
  const liProjFunc = (e) => {
    e.preventDefault();
    // console.log(e.target.innerHTML);
    inputSearchProj.current.value = e.target.innerHTML;
  }

  return (
    <div id="content22">        
      <div id="searchContainer">      
        <form id="formInLineTask">  
          <div id="formInLineDivTask">
            <input id="searchBarInputTask" className="searchInput" ref={inputSearchTask} type="text" placeholder="Search Task ..." onChange={searchTaskFunc} required></input>
            <button id="searchBarBtnTask" className = "searchBtn" type="button" data-target="#content23" onClick={searchTaskBtnFunc}>
              <span className="fa fa-search"></span>
            </button>
          </div>
          <ul className={showTaskSearchList} id="searchTaskList">          
          {suggestedTasks.map((task, index) => (
            <li ref={liTask} key={index} onClick={liTaskFunc}>
              {task}
            </li>
            ))
          }
          </ul>
        </form>
        <form id="formInLineProj">  
          <div id="formInLineDivProj">
            <input id="searchBarInputProj" className="searchInput" ref={inputSearchProj} type="text" placeholder="Search Proj ..." onChange={searchProjFunc} required></input>
            <button id="searchBarBtnProj" className = "searchBtn" type="button" data-target="#content23" onClick={searchProjBtnFunc}>
              <span className="fa fa-search"></span>
            </button>
          </div>
          <ul className={showProjSearchList} id="searchProjList">          
          {suggestedProjs.map((proj, index) => (
            <li ref={liProj} key={index} onClick={liProjFunc}>
              {proj}
            </li>
            ))
          }
          </ul>
        </form>
      </div>
      {showSearchTaskProjModal && <SearchValueTaskProj handleClose={()=>{setSearchTaskProjModal(false)}}/>} 
    </div>
  )
}

function dragDropTasks () {

  const searchProjBtn = document.querySelector("#searchBarBtnProj");
  const content231items = document.querySelectorAll(".taskContainers");
  // searchProjBtn.addEventListener("click", () => {
  const projSelected = document.querySelector("#content231Item1").textContent;
  const taskValues = allStorage()[2];
  const neededTaskObjs = [];
  for (let i = 0; i < taskValues.length; i++) {
    const taskProjTitle = taskValues[i].taskProject.replace(/\s/g, '').toLowerCase().replace('-task', '');
    if (projSelected.replace(/\s/g, '').toLowerCase() === taskProjTitle) {
      neededTaskObjs.push(taskValues[i]);
    }
  }
  //console.log(neededTaskObjs);
  const uListItems = document.querySelectorAll('.uListItem');

  uListItems.forEach(item => {
    item.remove();
  });
  for (let i = 0; i < neededTaskObjs.length; i++) {
    //console.log(neededTaskObjs[i].taskStatus);
    if (neededTaskObjs[i].taskStatus !== undefined && neededTaskObjs[i].taskStatus.replace(' - Task', '') === "To Do") {
      const uListItem = document.createElement("p");
      uListItem.appendChild(document.createTextNode(neededTaskObjs[i].taskName.replace(' - Task', '')));
      content231items[0].appendChild(uListItem);
      uListItem.setAttribute('id', `uListItem${document.querySelectorAll('div.taskContainers > p').length}`);
      uListItem.setAttribute("class", "uListItem");
      uListItem.setAttribute('draggable', 'true');
      uListItem.addEventListener('dragstart', drag);
      // add the drag and drop event listeners to every div element: to do, in progress, completed
      content231items[0].addEventListener('drop', drop);
      content231items[0].addEventListener('dragover', allowDrop);
      content231items[1].addEventListener('drop', drop);
      content231items[1].addEventListener('dragover', allowDrop);
      content231items[2].addEventListener('drop', drop);
      content231items[2].addEventListener('dragover', allowDrop);
    } else if (neededTaskObjs[i].taskStatus === 'In Progress') {
      const uListItem = document.createElement('p');
      uListItem.appendChild(document.createTextNode(neededTaskObjs[i].taskName.replace(' - Task', '')));
      content231items[1].appendChild(uListItem);
      uListItem.setAttribute('id', `uListItem${document.querySelectorAll('div.taskContainers > p').length}`);
      uListItem.setAttribute("class", "uListItem");
      uListItem.setAttribute('draggable', 'true');
      uListItem.addEventListener('dragstart', drag);
      // add the drag and drop event listeners to every div element: to do, in progress, completed
      content231items[0].addEventListener('drop', drop);
      content231items[0].addEventListener('dragover', allowDrop);
      content231items[1].addEventListener('drop', drop);
      content231items[1].addEventListener('dragover', allowDrop);
      content231items[2].addEventListener('drop', drop);
      content231items[2].addEventListener('dragover', allowDrop);
    } else if (neededTaskObjs[i].taskStatus === 'Completed') {
      const uListItem = document.createElement('p');
      uListItem.appendChild(document.createTextNode(neededTaskObjs[i].taskName.replace(' - Task', '')));
      content231items[2].appendChild(uListItem);
      uListItem.setAttribute('id', `uListItem${document.querySelectorAll('div.taskContainers > p').length}`);
      uListItem.setAttribute("class", "uListItem");
      uListItem.setAttribute('draggable', 'true');
      uListItem.addEventListener('dragstart', drag);
      // add the drag and drop event listeners to every div element: to do, in progress, completed
      content231items[0].addEventListener('drop', drop);
      content231items[0].addEventListener('dragover', allowDrop);
      content231items[1].addEventListener('drop', drop);
      content231items[1].addEventListener('dragover', allowDrop);
      content231items[2].addEventListener('drop', drop);
      content231items[2].addEventListener('dragover', allowDrop);
    }
  }
}


function allowDrop (event) {
  event.preventDefault();
}

function drag (event) {
  event.dataTransfer.setData('text', event.target.id);
  // console.log('drag');
}

function drop (event) {
  event.preventDefault();
  if (event.target.className === "taskContainers") {
    const data = event.dataTransfer.getData("text"); // this gets the id of the task
    const nodeHtml = document.getElementById(data);
    console.log(nodeHtml); // this gets the actual html element e.g.: <p>...</p>
    event.target.appendChild(nodeHtml); // adds the <p> element to the task container
    const currentSegDiv = document.getElementById(event.target.id); // selects the task container using its id
    const containerNum = currentSegDiv.id[currentSegDiv.id.length - 1];
    const segTitle = document.querySelectorAll(".content231Titles")[containerNum -1]; // takes the h1 element of a specific task container
    console.log(segTitle);
    const allItems = currentSegDiv.querySelectorAll("p");
    for (let i = 0; i < allItems.length; i++) {
    // console.log('1st for loop');
      const itemName = allItems[i].textContent;
      const itemNameResults = allStorage()[2].filter(obj => {
        return obj.taskName.replace(/\s/g, '').toLowerCase().replace("-task", "") === itemName.replace(/\s/g, "").toLowerCase();
      });
      // console.log(itemNameResults);
      // console.log('2nd for loop');
      for (let j = 0; j < itemNameResults.length; j++) {
        itemNameResults[j].taskStatus = segTitle.textContent;
      //  console.log(itemNameResults[j].taskName, itemNameResults[j].taskStatus)
        // window.localStorage.removeItem(itemNameResults[j].taskName);
        window.localStorage.setItem(itemNameResults[j].taskName, JSON.stringify(itemNameResults[j]));
      }
      // console.log(allItems[i].textContent);
      // console.log(allStorage()[1]);
    }
  }
}

function Content23 () {
  return (
    <div id="content23">
      <SearchedTaskResult />
      <SearchedProjResult />
      <Content231 />
    </div>
  )
}

function SearchedTaskResult () {
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);

  return (
    <div id="searchedTaskDiv" >  
      <div className="headerTbRow">
        <button id="editTask" onClick={()=>{setEditTaskModal(true)}}>
          <span className="fa fa-pencil-square-o symbolEdit"></span>
        </button>
        <button id="deleteTask" onClick={()=>{setDeleteTaskModal(true)}}>
          <span className="fa fa-trash-o symbolTrash"></span>
        </button>
      </div> 
      <table id="searchedTaskTable">    
        <tbody id="searchedTaskTbody">  
          <tr className="tbTaskRow" data-testid="tbTaskRow"></tr>
          <tr className="tbTaskRow" data-testid="tbTaskRow"></tr>
          <tr className="tbTaskRow" data-testid="tbTaskRow"></tr>
          <tr className="tbTaskRow" data-testid="tbTaskRow"></tr>
          <tr className="tbTaskRow" data-testid="tbTaskRow"></tr>
        </tbody>
      </table>
      {editTaskModal && <EditTaskModal handleClose={()=>{setEditTaskModal(false)}}/>}
      {deleteTaskModal && <RemoveTask handleClose={()=>{setDeleteTaskModal(false)}}/>} 
    </div>
  )
}

function SearchedProjResult () {
  const [editProjModal, setEditProjModal] = useState(false);
  const [deleteProjModal, setDeleteProjModal] = useState(false);
  
  return (
    <div id="searchedProjDiv" >  
      <div className="headerTbRow">
        <button id="editProj" onClick={()=>{setEditProjModal(true)}}>
          <span className="fa fa-pencil-square-o symbolEdit"></span>
        </button>
        <button id="deleteProj" onClick={()=>{setDeleteProjModal(true)}}>
          <span className="fa fa-trash-o symbolTrash"></span>
        </button>
      </div> 
      <table id="searchedProjTable">    
        <tbody>     
          <tr className="tbProjRow" data-testid="tbProjRow"></tr>
          <tr className="tbProjRow" data-testid="tbProjRow"></tr>
          <tr className="tbProjRow" data-testid="tbProjRow"></tr>
          <tr className="tbProjRow" data-testid="tbProjRow"></tr>
        </tbody>
      </table>
      {editProjModal && <EditProjModal handleClose={()=>{setEditProjModal(false)}}/>} 
      {deleteProjModal && <RemoveProj handleClose={()=>{setDeleteProjModal(false)}}/>} 
    </div>
  )
}

function RemoveTask({handleClose}) {
  const refModalDiv = useRef();
  const taskValues = allStorage()[2];
  let taskNames = [];
  for (let i = 0; i < taskValues.length; i++) {
    if (taskValues[i].taskName !== undefined && taskValues[i].taskName !== "") {
      taskNames.push(taskValues[i].taskName.replace(" - Task", "").replace(/\s/g, '').toLowerCase());
    }
  };
  const deleteTask = (e) => {
    e.preventDefault();
    // console.log(document.querySelectorAll(".tbTaskRow")[0]);
    const taskName = document.querySelectorAll(".tbTaskRow")[0].children[1].textContent.replace(/\s/g, '').replace(" - Task", "").toLowerCase();
    if (taskNames.indexOf(taskName) > -1 && taskName.length > 0) {
      const itemPosition = taskNames.indexOf(taskName);
      const deletedTask = Object.values(taskValues[itemPosition])[0];
      localStorage.removeItem(deletedTask);
      if (((!document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {
        $('#content21').css({
          'grid-column': '1 / 5', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 5', 
          'grid-row': '2 / 3'
        });
        $('#searchedTaskDiv').css({
          display: 'none'
        });
      } /*else if (((document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && !document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {
        $('#content21').css({
          'grid-column': '1 / 5', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 5', 
          'grid-row': '2 / 3'
        });
        $('#searchedProjDiv').css({
          display: 'none'
        });
      }*/ else if (((document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {
        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        $('#searchedTaskDiv').css({
          display: 'none'
        });
        $('#searchedProjDiv').css({
          display: 'block',
          'grid-column': '1 / 3', 
          'grid-row': '1 / 2'
        });
      }
    handleClose();
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refModalDiv.current && !refModalDiv.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleClose]);

  return ReactDom.createPortal(
    <div id="deleteTaskModal">
      <div id="deleteTaskTitleContainer" ref={refModalDiv}>
        <h1 id="deleteTaskTitle">        
          Are you sure you want to delete this task ?
        </h1>
        <button id="deleteTaskBtn" onClick={deleteTask}>        
          Yes, delete task.
        </button>
      </div>
    </div>,
  document.getElementById("mainContainer")

  )
}

function RemoveProj ({handleClose}) {
  const refModalDiv = useRef();
  const projValues = allStorage()[1];
  // console.log(projValues);
  const taskValues = allStorage()[2];
  const projName = document.querySelectorAll(".tbProjRow")[0].children[1].textContent.replace(/\s/g, '').replace(" - Proj", "").replace(" - Task", "").toLowerCase();
  // console.log(projName);
  const taskProjName = document.querySelectorAll(".tbTaskRow")[4].children[1];
  // console.log(taskProjName); 
  let projNames = [];
  for (let i = 0; i < projValues.length; i++) {
    if (projValues[i].projName !== undefined && projValues[i].projName !== "") {
      projNames.push(projValues[i].projName.replace(" - Proj", "").replace(/\s/g, '').toLowerCase());
    }
  };
  let tasksForRemoval = [];

  for (let i = 0; i < taskValues.length; i++) {
    console.log(taskValues[i].taskProject);
    // console.log(taskValues.indexOf(taskValues[i]));
    if (taskValues[i].taskProject.replace(" - Task", "").replace(/\s/g, '').toLowerCase() === projName) {
      tasksForRemoval.push(taskValues[i].taskName);
      console.log(tasksForRemoval);
    }
  }

  const deleteProject = (e) => {
    e.preventDefault();
    for (let i = 0; i < tasksForRemoval.length; i++) {
      localStorage.removeItem(tasksForRemoval[i]);
    }

    if (projNames.indexOf(projName) > -1 && projName.length > 0) {
      const itemPosition = projNames.indexOf(projName);
      const deletedProj = Object.values(projValues[itemPosition])[0];
      localStorage.removeItem(deletedProj);
      if (taskProjName !== undefined && projName === taskProjName.textContent.replace(/\s/g, '').replace(" - Task", "").toLowerCase()) {
        $('#content21').css({
          'grid-column': '1 / 5', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 5', 
          'grid-row': '2 / 3'
        });
        $("#searchedProjDiv").removeClass("displayBlock");       
        $("#content231").removeClass("displayBlock");
        $("#searchedTaskDiv").removeClass("displayBlock");
      } else if (((document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && !document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {
        $('#content21').css({
          'grid-column': '1 / 5', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 5', 
          'grid-row': '2 / 3'
        });
        $("#searchedProjDiv").removeClass("displayBlock");       
        $("#content231").removeClass("displayBlock");
      } else if (((document.querySelector("#searchedProjDiv").classList.contains("displayBlock") && document.querySelector("#searchedTaskDiv").classList.contains("displayBlock")))) {
        $('#content21').css({
          'grid-column': '1 / 2', 
          'grid-row': '1 / 2'
        });
        $('#content22').css({
          'grid-column': '1 / 2', 
          'grid-row': '2 / 3'
        });
        $('#searchedTaskDiv').css({
          display: 'block',
          'grid-column': '1 / 3', 
          'grid-row': '1 / 2'
        });
        $("#searchedProjDiv").removeClass("displayBlock");       
        $("#content231").removeClass("displayBlock");
      }
    }
    handleClose();
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refModalDiv.current && !refModalDiv.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleClose]);

  return ReactDom.createPortal(
    <div id="deleteProjModal">
      <div id="deleteProjTitleContainer" ref={refModalDiv}>
        <h1 id="deleteProjTitle">        
          Are you sure you want to delete this project? All tasks 
          associated with this project will be deleted as well. 
        </h1>
        <button id="deleteProjBtn" onClick={deleteProject}>        
          Yes, delete project.
        </button>
      </div>
    </div>,
    document.getElementById("mainContainer")
  )
}

function EditTaskModal({handleClose}) {
  const [taskDescEdit, setTaskDescEdit] = useState("");
  const [taskStDateEdit, setTaskStDateEdit] = useState("");
  const [taskEndDateEdit, setTaskEndDateEdit] = useState("");
  
  const refForm = useRef();
  const taskName = document.querySelectorAll(".tbTaskRow")[0].children[1].textContent;
  const taskValues = allStorage()[2];
  let taskNames = [];
  for (let i = 0; i < taskValues.length; i++) {
    if (taskValues[i].taskName !== undefined && taskValues[i].taskName !== "") {
      taskNames.push(taskValues[i].taskName.replace(" - Task", ""));
    }
  };

  const submitTaskEdit = (e) => {
    console.log(taskNames);
    console.log(taskName);
    console.log(taskNames.indexOf(taskName));
    if (taskNames.indexOf(taskName) > -1 && taskDescEdit.length > 0) {
      const elementPos = taskNames.indexOf(taskName);
      const taskToChange = taskValues[elementPos];
      taskToChange.taskDescription = taskDescEdit;
      console.log(taskToChange);
      localStorage.removeItem(Object.values(taskToChange)[0]);
      localStorage.setItem(Object.values(taskToChange)[0], JSON.stringify(taskToChange));
      console.log(taskDescEdit);
      const tableRow = document.querySelectorAll(".tbTaskRow")[1];
      const currentDesc = tableRow.querySelectorAll("td")[1];
      console.log(currentDesc);
      currentDesc.textContent = taskDescEdit;
    }

    if (taskNames.indexOf(taskName) > -1 && taskStDateEdit.length > 0) {
      const elementPos = taskNames.indexOf(taskName);
      const taskToChange = taskValues[elementPos];
      taskToChange.taskStartDate = taskStDateEdit;
      localStorage.removeItem(Object.values(taskToChange)[0]);
      localStorage.setItem(Object.values(taskToChange)[0], JSON.stringify(taskToChange));
      const tableRow = document.querySelectorAll(".tbTaskRow")[2];
      const currentStDate = tableRow.querySelectorAll("td")[1];
      currentStDate.textContent = taskStDateEdit;
    }

    if (taskNames.indexOf(taskName) > -1 && taskEndDateEdit.length > 0) {
      const elementPos = taskNames.indexOf(taskName);
      const taskToChange = taskValues[elementPos];
      taskToChange.taskEndDate = taskEndDateEdit;
      localStorage.removeItem(Object.values(taskToChange)[0]);
      localStorage.setItem(Object.values(taskToChange)[0], JSON.stringify(taskToChange));
      const tableRow = document.querySelectorAll(".tbTaskRow")[3];
      const currentEndDate = tableRow.querySelectorAll("td")[1];
      currentEndDate.textContent = taskEndDateEdit;
    }
    $('#editTaskModal').css({
      display: "none"
    });
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refForm.current && !refForm.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleClose]);

  return ReactDom.createPortal(
    <div id="editTaskModal">    
      <div id="editTaskForm" ref={refForm}>  
        <div id="taskDescriptionDivEdit">
          <textarea id="textDescriptionInputEdit" value={taskDescEdit} placeholder="Edit Task Description..." onChange={(e)=>setTaskDescEdit(e.target.value)}></textarea>
        </div>
        <div id="taskStartDateDivEdit">
          <h3>Edit Start Date</h3>
          <input id="taskStartDateInputEdit" value={taskStDateEdit} onChange={(e)=>setTaskStDateEdit(e.target.value)} type="date"></input>
        </div>
        <div id="taskEndDateDivEdit">
          <h3>Edit End Date</h3>
          <input id="taskEndDateInputEdit" value={taskEndDateEdit} onChange={(e)=>setTaskEndDateEdit(e.target.value)} type="date"></input>
        </div>  
        <button id="editTaskSubmitBtn" type="submit" onClick={submitTaskEdit}>
          Submit
        </button>  
      </div>
    </div>,
    document.getElementById("mainContainer")
  )
}

function EditProjModal({handleClose}) {
  const [projDescEdit, setProjDescEdit] = useState("");
  const [projStDateEdit, setProjStDateEdit] = useState("");
  const [projEndDateEdit, setProjEndDateEdit] = useState("");
  
  const refForm = useRef();
  const projName = document.querySelectorAll(".tbProjRow")[0].children[1].textContent;
  const projValues = allStorage()[1];
  let projNames = [];
  for (let i = 0; i < projValues.length; i++) {
    if (projValues[i].projName !== undefined && projValues[i].projName !== "") {
      projNames.push(projValues[i].projName.replace(" - Proj", ""));
    }
  };

  const submitProjEdit = (e) => {
    console.log(projNames);
    console.log(projName);
    console.log(projNames.indexOf(projName));
    if (projNames.indexOf(projName) > -1 && projDescEdit.length > 0) {
      const elementPos = projNames.indexOf(projName);
      const projToChange = projValues[elementPos];
      projToChange.projDescription = projDescEdit;
      console.log(projToChange);
      localStorage.removeItem(Object.values(projToChange)[0]);
      localStorage.setItem(Object.values(projToChange)[0], JSON.stringify(projToChange));
      console.log(projDescEdit);
      const tableRow = document.querySelectorAll(".tbProjRow")[1];
      const currentDesc = tableRow.querySelectorAll("td")[1];
      console.log(currentDesc);
      currentDesc.textContent = projDescEdit;
   }

    if (projNames.indexOf(projName) > -1 && projStDateEdit.length > 0) {
      const elementPos = projNames.indexOf(projName);
      const projToChange = projValues[elementPos];
      projToChange.projStartDate = projStDateEdit;
      localStorage.removeItem(Object.values(projToChange)[0]);
      localStorage.setItem(Object.values(projToChange)[0], JSON.stringify(projToChange));
      const tableRow = document.querySelectorAll(".tbProjRow")[2];
      const currentStDate = tableRow.querySelectorAll("td")[1];
      currentStDate.textContent = projStDateEdit;

    }

    if (projNames.indexOf(projName) > -1 && projEndDateEdit.length > 0) {
      const elementPos = projNames.indexOf(projName);
      const projToChange = projValues[elementPos];
      projToChange.projEndDate = projEndDateEdit;
      localStorage.removeItem(Object.values(projToChange)[0]);
      localStorage.setItem(Object.values(projToChange)[0], JSON.stringify(projToChange));
      const tableRow = document.querySelectorAll(".tbProjRow")[3];
      const currentEndDate = tableRow.querySelectorAll("td")[1];
      currentEndDate.textContent = projEndDateEdit;
    }
    $('#editProjModal').css({
      display: "none"
    });
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (refForm.current && !refForm.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [handleClose]);

  return ReactDom.createPortal(
    <div id="editProjModal">    
      <div id="editProjForm" ref={refForm}>  
        <div id="projDescriptionDivEdit">
          <textarea id="textDescriptionInputEditProj" value={projDescEdit} placeholder="Edit Project Description..." onChange={(e)=>setProjDescEdit(e.target.value)}></textarea>
        </div>
        <div id="projStartDateDivEdit">
          <h3>Edit Start Date</h3>
          <input id="projStartDateInputEdit" value={projStDateEdit} onChange={(e)=>setProjStDateEdit(e.target.value)} type="date"></input>
        </div>
        <div id="projEndDateDivEdit">
          <h3>Edit End Date</h3>
          <input id="projEndDateInputEdit" value={projEndDateEdit} onChange={(e)=>setProjEndDateEdit(e.target.value)} type="date"></input>
        </div>  
        <button id="editProjSubmitBtn" type="submit" onClick={submitProjEdit}>
          Submit
        </button>  
      </div>
    </div>,
    document.getElementById("mainContainer")
  )
}


function Content231 () {

  return (
    <div id="content231">
      <div className="content231Item" id="content231Item1">
        <h1 className="content231Titles">
        </h1>
      </div>
      <div className="content231Item" id="content231Item2">
        <div className="content231ContainersTitle">
          <h1 className="content231Titles">
            To Do
          </h1>
        </div>
        <div className="taskContainers" id="taskContainer1"></div>
      </div>
      <div className="content231Item" id="content231Item3">
        <div className="content231ContainersTitle">
          <h1 className="content231Titles">
            In Progress
          </h1>
        </div>
        <div className="taskContainers" id="taskContainer2"></div>
      </div>
      <div className="content231Item" id="content231Item4">
        <div className="content231ContainersTitle">
          <h1 className="content231Titles">
            Completed
          </h1>
        </div>
        <div className="taskContainers" id="taskContainer3"></div>
      </div>
    </div>
  )
}

export { App, RemoveTask, Content21, Content22, Content23, SearchedProjResult, SearchedTaskResult };