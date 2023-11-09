const express = require('express');
const router = express.Router();
const fs = require('fs');



router.get('/getData', async (req, res) => {
  try {
    success = false;
    const Data = {
      "importantQuestions" :
    [
      {
        "title": "If Sring is palindrom",
        "description": "Given a string s, return true if it is a palindrome, or falseotherwise. Given a word, check if it is a plaindrome. Example - 'Apple' will return false, but 'gag' will return true. String s, return true if it is a palindrome, or false otherwise.",
        "constraints":
        [ "marker 1 <= s.lenght <= 2 * 18^5","marker s cosists only of printable ASCII characters"],
        "submission": "",
        "score": 0,
        "feedback": "",
        "submissionDate": "",
        "reviewedBy": ""
      },
      {
        "title": "Validate BST",
        "description": " Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key.",
        "constraints": 
        [ "marker 1 <= s.lenght <= 2 * 18^5","marker s cosists only of printable ASCII characters"],
        "submission": "",
        "score": 0,
        "feedback": "",
        "submissionDate": "",
        "reviewedBy": ""
      }
    ]
  }
  success = true;
    res.json(Data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

router.post('/submitData', async (req, res) => {
  try {

    console.log(req.body);
    success = true;
    const Title = req.body.Title;
    let newDate = new Date(`${req.body.Date}`);
			const DAY = newDate.getDate();
			const MONTH = newDate.getMonth() + 1;
			const YEAR = newDate.getFullYear();
			const Minutes = newDate.getMinutes();
      const SEC = newDate.getSeconds();
      // console.log( );
    const Code = req.body.code;
    const Feedback = req.body.feedback;
    
    const obj ={
      "Title": Title,
      "Date": `${DAY}/${MONTH}/${YEAR}/${Minutes}/${SEC}`,
      "code": Code,
      "feedback" : Feedback
    }

    fs.writeFile(`./tempData/${Title}-${DAY}-${MONTH}-${YEAR}-${Minutes}-${SEC}.json`,`${JSON.stringify(obj)}`,function (err) {
      if (err) {
      console.log("Error occurred", err);
      success = false;
      }else{
      console.log("File write successfull");
      success = true;
      }
      });
//     // // create a json file and appand the data there
console.log(success);   
res.json({success});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})



module.exports = router;