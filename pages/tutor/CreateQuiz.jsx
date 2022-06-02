import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';

const Form = styled.form`
display:${props => props.quizDisplay ? "flex" : "none"};
flex-direction:column;
`
const Form2 = styled.form`
display:flex;
flex-direction:column;
`
const Label = styled.label`
font-size:15px;
font-family:ui-serif;
`
const Input = styled.input`
padding:8px 0;
border-radius:5px;
`
const Textarea = styled.textarea`
border-radius:5px;
`
const Spacer = styled.div`
height:10px;
`
const QuestionContainer = styled.div`
display:${props => props.displayQuestion ? "flex" : "none"};
flex-direction:column;
`
const ChoiceContainer = styled.div`
padding-left:30px;
display:flex;
flex-direction:column;
`
const Row = styled.div`
display:flex;
`
const HorSpacer = styled.div`
width:10px;
`
const NotificationContainer=styled.div`
display:${props => props.displayNotification ? "flex" : "none"};
flex-direction:column;
`
const Select=styled.select`
padding:8px;
border-raduis:10px;
width:25%;
background-color:white; 
`
const Option=styled.option`
`
const E=styled.sub`
color:red;
display:${props=>props.error1?"flex":"none"};
`
const E2=styled.sub`
color:red;
display:${props=>props.error2?"flex":"none"};
`
const E3=styled.sub`
color:red;
display:${props=>props.error3?"flex":"none"};
`
const E4=styled.sub`
color:red;
display:${props=>props.error4?"flex":"none"};
 `
 const E5=styled.sub`
color:red;
display:${props=>props.error5?"flex":"none"};
`
const E6=styled.sub`
color:red;
display:${props=>props.error6?"flex":"none"};
`
const E7=styled.sub`
color:red;
display:${props=>props.error7?"flex":"none"};
`

export default function CreateQuiz() {
  const { user } = useSelector((state) => state.auth)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [quizId, setQuizId] = useState()
  const [quizDisplay, setQuizDisplay] = useState(true)
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayNotification,setDisplayNotification]=useState(false)
  const [error1,setError1]=useState(false)
  const [error2,setError2]=useState(false)
 

  const submitQuiz = async (e) => {
     if(title===""){
    setError1(true)
  }
  if(desc===""){
    setError2(true)
  }


    const data = {
      userId: user.data.id,
      title,
      desc
    }
    try {
      const res = await axios.post('http://localhost:5000/api/quiz', data)
      if (res.status === 201) {
        setQuizId(res.data.data.id)
        toast.success(res.data.message)
        setQuizDisplay(false)
        setDisplayQuestion(true)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const [question, setQuestion] = useState('')
  const [error3,setError3]=useState(false)

  const [choiceA, setChoiceA] = useState('')
  const [error4, setError4]=useState(false)

  const [choiceB, setChoiceB] = useState('')
  const [error5, setError5]=useState(false)

  const [choiceC, setChoiceC] = useState('')
  const [error6, setError6]=useState(false)

  const [choiceD, setChoiceD] = useState('')
  const [error7, setError7]=useState(false)
  const [answer,setAnswer]=useState('')

  const submitQuestion = async (e) => {
    if(question===""){
      setError3(true)
    }
    if(choiceA===""){
      setError4(true)
    }
    if(choiceB===""){
      setError5(true)
    }
    if(choiceC==="")
    {setError6(true)}
  
    if(choiceD===""){
      setError7(true)
    }
   const data = {
      quizId,
      question
    }
    try {
      const res = await axios.post('http://localhost:5000/api/question', data)
      if (res.status === 201) {
        if(answer==='a'){
          await axios.post('http://localhost:5000/api/choice', {
          questionId: res.data.data.id,
          choice: choiceA,
          answer:true,
        })
        }else{
          await axios.post('http://localhost:5000/api/choice', {
            questionId: res.data.data.id,
            choice: choiceA
          })
        }
        if(answer==='b'){
          await axios.post('http://localhost:5000/api/choice', {
          questionId: res.data.data.id,
          choice: choiceB,
          answer:true,
        })
        }else{
          await axios.post('http://localhost:5000/api/choice', {
            questionId: res.data.data.id,
            choice: choiceB
          })
        }
        if(answer==='c'){
          await axios.post('http://localhost:5000/api/choice', {
          questionId: res.data.data.id,
          choice: choiceC,
          answer:true,
        })
        }else{
          await axios.post('http://localhost:5000/api/choice', {
            questionId: res.data.data.id,
            choice: choiceC
          })
        }
        if(answer==='d'){
          await axios.post('http://localhost:5000/api/choice', {
          questionId: res.data.data.id,
          choice: choiceD,
          answer:true,
        })
        }else{
          await axios.post('http://localhost:5000/api/choice', {
            questionId: res.data.data.id,
            choice: choiceD
          })
        }
        
        // toast.success(res.data.message)
        // setDisplayQuestion(true)
        setQuestion('')
        setChoiceA('')
        setChoiceB('')
        setChoiceC('')
        setChoiceD('')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }
  
  console.log(answer)
  const navigate=useNavigate()
  const saveQuiz=()=>{
 
    setDisplayQuestion(false);
    setDisplayNotification(true);
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={0} md={2} lg={2}>
        </Grid>
        <Grid item sm={12} md={8} lg={8}>
          <Form quizDisplay={quizDisplay}>
            <Label>Title of the quiz</Label>
            <Input type={"text"} placeholder={"Title of the quiz"} onChange={e => { setTitle(e.target.value) }} />
            <E error1={error1}>Title is empty!</E>
            <Spacer />
            <Label>Description of the quiz</Label>
            <Textarea type={"text"} placeholder={"Description of the quiz"} onChange={e => { setDesc(e.target.value) }}></Textarea>
            <E2 error2={error2}>discription is empty!</E2>
         <Spacer />
            <Button variant='contained' onClick={submitQuiz}>Create Quiz</Button>
          </Form>
          <QuestionContainer displayQuestion={displayQuestion}>
            <Form2>
              <Label>Write the question</Label>
              <Input value={question} type={"text"} placeholder={"Write question"} onChange={e => { setQuestion(e.target.value) }} />
              <E3 error3={error3}>Question Can not be empty!</E3>
              <Spacer />
              <ChoiceContainer>
                <Row>
                  <Label>A</Label>
                  <HorSpacer />
                  <Input value={choiceA} type={"text"} placeholder={"  Enter Choice"} onChange={e => { setChoiceA(e.target.value) }} />
                  <E4 error4={error4}>field can't be empty</E4>

                </Row>
                <Spacer />
                <Row>
                  <Label>B</Label>
                  <HorSpacer />
                  <Input value={choiceB} type={"text"} placeholder={"  Enter Choice"} onChange={e => { setChoiceB(e.target.value) }} />
                  <E5 error5={error5}>field can't be empty</E5>

                </Row>
                <Spacer />
                <Row>
                  <Label>C</Label>
                  <HorSpacer />
                  <Input value={choiceC} type={"text"} placeholder={"  Enter Choice"} onChange={e => { setChoiceC(e.target.value) }} />
                  <E6 error6={error6}>field can't be empty</E6>

                </Row>
                <Spacer />
                <Row>
                  <Label>D</Label>
                  <HorSpacer />
                  <Input value={choiceD} type={"text"} placeholder={"  Enter Choice"} onChange={e => { setChoiceD(e.target.value) }} />
                  <E7 error7={error7}>field can't be empty</E7>

                </Row>
              </ChoiceContainer>
              <Spacer/>
              <Label>Select Answer</Label>
              <Select onChange={e => { setAnswer(e.target.value) }}>

                <Option value='a'>A</Option>
                <Option value='b'>B</Option>
                <Option value='c'>C</Option>
                <Option value='d'>D</Option>
              </Select>
              <Spacer />
              <Spacer/>
              <Spacer/>
              <Button variant='contained' onClick={submitQuestion}><AddIcon />
                <HorSpacer />Add Question</Button>
              <Spacer />
              <Button variant='contained' onClick={saveQuiz}>Save Quiz</Button>
            </Form2>
          </QuestionContainer>
          <NotificationContainer displayNotification={displayNotification}>

            <p>Your Quiz Created Successfully, Thanks!</p>
          </NotificationContainer>
        </Grid>
        <Grid item sm={0} md={2} lg={2}>
        </Grid>
      </Grid>
    </div>
  )
}
