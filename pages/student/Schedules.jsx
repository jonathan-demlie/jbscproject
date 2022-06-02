import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import moment from 'moment';
import { Button, Pagination } from '@mui/material';
import usePagination from '../../components/MyPagination';
import { toast } from 'react-toastify';

export default function Schedules() {
  const [schedules, setSchedules] = useState([])
  const { user } = useSelector((state) => state.auth)

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/api/schedule/${user.data.id}`);
    if (res.status == 200) {
      setSchedules(res.data.data)
    }
  }, [])
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(schedules.length / PER_PAGE);
  const _DATA = usePagination(schedules, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  // Delete schedules
  const remove=async(value)=>{
    const res = await axios.delete(`http://localhost:5000/api/schedule/${value}`);
    if(res.status===200){
      toast.success(res.data.message)
    }else{
      toast.error(res.data.message)
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 30 }}>No</TableCell>
              <TableCell align="center" style={{ width: 260 }}>Title</TableCell>
              <TableCell align="center" style={{ width: 160 }}>Start Time</TableCell>
              <TableCell align="center" style={{ width: 160 }}>End Time</TableCell>
              <TableCell align="center" style={{ width: 60 }}>Status</TableCell>
              <TableCell align="center" style={{ width: 60 }}>Edit</TableCell>
              <TableCell align="center" style={{ width: 60 }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_DATA.currentData().map((schedule, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ width: 160 }}>
                  {index + 1}
                </TableCell>
                <TableCell align="left" style={{ width: 160 }}>{schedule.title}</TableCell>
                <TableCell align="left" style={{ width: 160 }}>{moment(schedule.startDate).format('LLL')}</TableCell>
                <TableCell align="left" style={{ width: 160 }}>{moment(schedule.endDate).format('LLL')}</TableCell>
                <TableCell>{schedule.status}</TableCell>
                <TableCell>{<Button variant='contained'>Edit</Button>}</TableCell>
                <TableCell><Button variant='contained' style={{ backgroundColor: "#bb2124", }} onClick={()=>remove(schedule.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={count}
          size="large"
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </TableContainer>
    </div>
  )
}
