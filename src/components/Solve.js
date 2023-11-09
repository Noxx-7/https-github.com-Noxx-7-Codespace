import React from 'react'
import Editor from "@monaco-editor/react";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios"
import {useNavigate} from 'react-router-dom';


function Solve() {
  let navigate = useNavigate();

    const search = useLocation().search;
    const name = new URLSearchParams(search).get('Name');
  
    // console.log(name)
  
    const [queName, setQueName] = useState(name);
    const [date, setDate] = useState("");
    const [feedback, setFeedback] = useState("Enter Your Feedback");
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("java");
    function handleEditorChange(value, event) {
      setCode(value);
      setDate(new Date())
      // console.log("here is the current model value:", code, date);
    }
    
    function sendFeedback(event) {
      setFeedback(event.target.value);
      // console.log("here is the current model value:",queName, code, date, feedback);
    }
  
    function selectLang(event){
          const Name = event.target.value;
          console.log(Name);
          if( Name === 1){
            setLang("Objective-C");
          }else if( Name === 2){
            setLang("C++");
          }else if( Name === 3){
            setLang("Java");
          }else if( Name === 4){
            setLang("C#");
          }else {
            setLang("Python");
          }
    }
  

   
    const jsonData = {
        Title: `${queName}`,
        Date: `${date}`,
        code: `${code}`,
        feedback : `${feedback}`
      }
  // submit 
      function submit() {
      
        if((code.length < 15  && feedback.length === 0) || (code.length < 15 && feedback.length > 0)){
          // console.log("blank data")
          alert("False")
          setCode("//Write again");
          setFeedback("Enter again");
  
        }else {
          // console.log(code)
          
          console.log(feedback);
          // Send data to the backend via POST
          fetch('http://localhost:5000/api/data/submitData', {  // Enter your IP address here
          method: 'POST', 
          headers: { "Content-Type": "application/json" },
          mode: 'cors', 
          body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          
        })
        alert("True")
        
        // navigate(`/`);
      }
      }
  
    // function submit() {
      
    //   console.log(feedback);
    //   // Send data to the backend via POST
    //   fetch('http://localhost:5000/api/data/submitData', {  // Enter your IP address here
    //     method: 'POST', 
    //     headers: { "Content-Type": "application/json" },
    //     mode: 'cors', 
    //     body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  
    //   })
      
    //   setCode("");
    //   setFeedback("Enter Your Feedback");
    //   navigate(`/`);
    // }
    const [data, setData] = useState(null);
    // console.log("hi" + data)
    useEffect(() => {
        axios.get("http://localhost:5000/api/data/getData")
        .then((response) =>
        {
             console.log(response.data.importantQuestions)
            setData(response.data.importantQuestions)
        });
      }, []);
    
        if(data != null){
    return (
     
    <div style={{ padding: "5%", paddingTop: "2%" }}>
    <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
      <ul className="list-group rounded">
        {
          data.map((e, id) => {
            if (queName === e.title) {
              // console.log(id);
              return (
                <div>
                  <li className="list-group-item active" aria-current="true"><b >Here is your question : -</b></li>
                  <li className="list-group-item" style={{borderWidth:0}} ><b>{queName} : -</b>
                    <br />
                    <ul className="m-3"><li className="list-group-item" style={{borderWidth:0}} >{e.description}</li></ul>
                  </li>
                  <li className="list-group-item" style={{borderWidth:0}}  ><b>Constraints : -</b><br />
                  <ul className="m-3">
                    <li >{e.constraints[0]}</li>
                    <li >{e.constraints[1]}</li> 
                  </ul>
                  </li>            
                </div>
              )
            }
          })
        }
      </ul>
    </div>

    <div style={{ paddingLeft: "10%", paddingTop: 20 }}>
        <b>Feedback </b><br /><br />
    <textarea
        value={feedback}
        onChange={sendFeedback}
        rows={5}
        cols={5}
        style={{width:"80%",height:100,padding:5,resize:"none"}}
      />
    </div>
    <div class="dropdown" style={{ paddingLeft: "10%", paddingTop: 20,width:"30%" }}>
    <select class="form-select" aria-label="Default select example" onChange={(event) => {selectLang(event)}}>
<option selected disabled>Choose Language</option>
<option value="1" >C Language</option>
<option value="2" >C++ 17</option>
<option value="3" >C#</option>
<option value="4" >Java</option>
<option value="5" >Python 3</option>
</select>

</div>
    <div style={{ paddingLeft: "10%", paddingTop: 20 }}>
    <b>Here we go : - </b><br /><br />
      <Editor
        height="80vh"
        width="80%"
        defaultLanguage={lang}
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        style={{padding:5}}
      />
    </div>
    
    <button type="button" className="btn float-end btn-primary btn-lg m-5" onClick={() => { submit() }}  >Submit</button>
    </div>

    );
  
  }
}
  export default Solve;