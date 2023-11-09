import { json } from "react-router-dom";


const fetchData = () => {
    
    fetch(
        "http://localhost:5000/api/data/getData")
                    .then((res) => res.json())
                    .then((json) => {
                      console.log(json);
                    return json
                    })
    // console.log("hiiiii" + json)
}

export default fetchData;