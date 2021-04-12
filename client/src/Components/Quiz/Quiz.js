import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {Icon, Image,Button, Form, Segment,Progress, Container,Header, Divider} from 'semantic-ui-react';
import { isAuth } from '../../helpers/auth.js';
import { getListQuestionTasksById,assignGradeToStudent } from '../../redux/slices/Grade.js';
import { getQuizzes } from "../../redux/slices/Quiz.js";


export default function Quiz() {

  const {id} = useParams();
  const quizzes = useSelector( state => state.grades.listQuestion);
  const [objgrade , setObjGrade] =useState({"_id" : null , "grade" :0})
     const [score,setScore] = useState(0);
    const [cuurQuestion,setCurrQuestion] = useState(0);
    const [optionChosen,setOptionChosen]= useState('');

   
    const nextQuestion = () =>{
   
      if(optionChosen===quizzes[cuurQuestion].correct_answer)
  setScore(score+1);
      setCurrQuestion(cuurQuestion+1);
      setOptionChosen("")
    
  
      
    }
    console.log(quizzes)
    const dispatch = useDispatch();
    const handleResult = () =>{
      if(optionChosen===quizzes[cuurQuestion].correct_answer)
      dispatch(assignGradeToStudent({"_id" :id,"grade" : score+1 }));
    
    
    }
const handleChosen = (option) =>{
 

  setOptionChosen(optionChosen!= option ? option  : "")

  

  
}

 useEffect(()=>{
  
 // dispatch(getQuizzes());
 dispatch(getListQuestionTasksById(id));
 },[id]);

    return (
   
        <div className="Quiz" >
   
    
<Divider hidden />
     <Segment raised>
     
         <Progress active color="red" percent={(1+cuurQuestion)*100/quizzes.length} attached='top' />
  
                {
                quizzes.length>0 ? (
               
                  <div>
              
                <h1> {quizzes[cuurQuestion].fquestion+"?"}   </h1>
                <p>Question { cuurQuestion+1} of { quizzes.length}</p>
                <Divider section />
   
    
    <Button size="big"fluid basic={optionChosen!=quizzes[cuurQuestion].foptionA} color='grey' onClick={()=>handleChosen(quizzes[cuurQuestion].foptionA)}>{quizzes[cuurQuestion].foptionA}</Button>
    <Divider hidden />
    <br/>
        <Button size="big"  fluid basic={optionChosen!=quizzes[cuurQuestion].foptionB} color='grey' onClick={()=>handleChosen(quizzes[cuurQuestion].foptionB)}>{quizzes[cuurQuestion].foptionB}</Button>
      
 <br/>
        <Divider hidden />
   
        
        <Button size="big" fluid basic={optionChosen!=quizzes[cuurQuestion].foptionC} color='grey' onClick={()=>handleChosen(quizzes[cuurQuestion].foptionC)}>{quizzes[cuurQuestion].foptionC}</Button>
        <Divider hidden />
        <br/>
        <Button size="big" fluid basic={optionChosen!=quizzes[cuurQuestion].foptionD} color='grey' onClick={()=>handleChosen(quizzes[cuurQuestion].foptionD)}>{quizzes[cuurQuestion].foptionD}</Button>
    
      <Divider section />
      {cuurQuestion == quizzes.length-1 ? (
        <Link to={"/Result/"+id}>
        <Button onClick={()=>handleResult()} animated='fade'>
         <Button.Content visible>Finish Quiz</Button.Content>
      <Button.Content hidden>View result</Button.Content>
        </Button>
        </Link>
      ) :(
        <>
         <Button.Group>
        <Button onClick={()=>nextQuestion()} disabled={!optionChosen} content='Continue'/> 
        
        </Button.Group>
        </>
      )}
   
     
                </div>
                    
                  
                 
    
         
                ) : <Segment loading><h1>No Qts</h1> </Segment>
                }
          
          <Progress   active  color="red" percent={(1+cuurQuestion)*100/quizzes.length} attached='bottom' />
          </Segment>
    
        </div>
       
    )
}
