import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import "./Home.css"

function Home() {
    let navigate = useNavigate();
  const goToCode = (event) => {
    const Name = event.target.innerText;
    navigate(`/Solve?Name=${Name}`);
  }
  
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
	<div style={{padding:"7%"}}>
            <div className='d-flex flex-row mb-2'>
            <ul className="list-group p-2 h-50 w-50">
                <li className="list-group-item active" aria-current="true">Wanna Solve the Question ? </li>
         { 
            data.map((e, id) => {
                return (
                  <div>
                    <li className="list-group-item highlight"  onClick={(event) => {goToCode(event)}}>{e.title}</li>
                  </div>
                )
              }
            )
            }
            </ul>
            <div className='w-50 h-50 m-2 p-2 ' ></div>
            </div>
        </div>
);}
}

export default Home;
