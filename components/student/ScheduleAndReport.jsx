import { Box, Divider, IconButton, Modal, Typography, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components'
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReportIcon from '@mui/icons-material/Report';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';


const Row3 = styled.div`
display:flex;
justify-content:space-between;
`
const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  pl: 4,
  pr: 4,
  pt: 2,
  pb: 4,
};
const style1 = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  pl: 4,
  pr: 4,
  pt: 2,
  pb: 4,
};
const Form = styled.form`
margin-top:10px;
padding-top:20px;
`
const Spacer = styled.div`
height:20px;
`
const Row = styled.div`
display:flex;
justify-content:space-between;
`
const Space = styled.div`
height:20px;
`
const El = styled.p`
padding-left:10px;
padding-top:5px;
`
const Picker = styled(DatePicker)`
padding:20px;
width:91%;
`
const Label = styled.label`
padding-bottom:5px;
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
const ErrorDateInterval=styled.sub`
color:red;
display:${props=>props.errorDate?"flex":"none"};
`
export default function ScheduleAndReport({ id }) {
  const { user } = useSelector((state) => state.auth)
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate()
  const handleOpen = () => {
    if(user){
      setOpen(true)
    }else{
      navigate('/login')
    }
  };
  const handleClose = () => setOpen(false);

  const [openRepo, setOpenRepo] = React.useState(false);
  const handleOpenRepo = () => {
    if(user){
      setOpenRepo(true)
    }else{
      navigate('/login')
    }
  };
  const handleCloseRepo = () => setOpenRepo(false);

  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [error1, setError1]=React.useState(false);
  const [error2, setError2]=React.useState(false);
  const [errorDate, setErrorDate]=React.useState(false);

  const submit = async (e) => {
  if(title===""){
    setError1(true)
  }
  if(desc===""){
    setError2(true)
  }
  if ((Date.parse(startDate) > Date.parse(endDate))) {
    setErrorDate(true);
    alert("End date should be greater than Start date");
}
    const data = {
      studentId: user.data.id,
      tutorId: id,
      title,
      startDate,
      desc,
      endDate,
    }
    const res = await axios.post('http://localhost:5000/api/schedule', data);
    if (res.status === 201) {
      handleClose()
    } else {
      console.log("Unsuccess")
    }
    // console.log(data)

  }
  const [content, setContent] = useState('')
const [error3, setError3]=useState(false)

  const submitRepo = async (e) => {
    if(content===""){
      setError3(true)
    }
    const data = {
      studentId: user.data.id,
      tutorId: id,
      content,
    }
    const res = await axios.post('http://localhost:5000/api/report', data);
    if (res.status === 201) {
      handleCloseRepo()
    } else {
      console.log("Unsuccess")
    }
    console.log(data)
  }
  return (
    <div>
      <Row>
        <Button variant='contained' onClick={handleOpen}><EventNoteIcon /> <El>Schedule Class</El> </Button>
        <Button variant='contained' onClick={handleOpenRepo}><ReportIcon /><El>Report Complaint</El> </Button>
      </Row>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row3>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Rate and Review Tutor
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Row3>
          <Divider />
          <Spacer />
          <Form>
            <TextField onChange={(e) => setTitle(e.target.value)} fullWidth label="Title for the schedule" id="fullWidth" />
            <E error1={error1}>title is empty!</E>
            <Spacer />
            <Label>Select class start time</Label>
            <Picker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              dateFormat="Pp"
            />
            <Spacer />
            <Label>Select class end time</Label>
            <Picker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect
              timeFormat="p"
              timeIntervals={15}
              dateFormat="Pp"
            />
            <Spacer />
            <TextField onChange={(e) => setDesc(e.target.value)} fullWidth label="description about the schedule" id="fullWidth" />
            <E2 error2={error2}>Schedule discription is empty!</E2>

            <Spacer />
            <Button variant='contained' onClick={submit}>Submit</Button>
             <ErrorDateInterval error2={error2}>Subject discription is empty!</ErrorDateInterval>

          </Form>
        </Box>
      </Modal>

      <Modal
        open={openRepo}
        onClose={handleCloseRepo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Row3>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Write complaint about tutor
            </Typography>
            <IconButton onClick={handleCloseRepo}>
              <ClearIcon />
            </IconButton>
          </Row3>
          <Divider />
          <Spacer />
          <Form>
            <TextField onChange={(e) => setContent(e.target.value)} fullWidth label="Content of your complaint" id="fullWidth" />
            <E3 error3={error3}>Report boody is empty!</E3>

            <Spacer />
            <Button variant='contained' onClick={submitRepo}>Submit</Button>
          </Form>
        </Box>
      </Modal>
    </div>
  )
}
