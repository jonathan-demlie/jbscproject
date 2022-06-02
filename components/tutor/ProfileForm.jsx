import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { show,create} from '../../features/profile/profileSlice'
import axios from 'axios';
const Form = styled.form`
padding-top:5vh;
width:90%;
display:flex;
flex-direction:column;
margin: 0 auto;
`
const Label = styled.label`
font-size:16px;
`

const Input = styled.input`
margin-bottom:10px;
padding:5px;
height:30px;
border-radius:5px;
font-size:16px;
::placeholder {
    color: black;
    font-size: 1.5em;
  }
&:focus{
    outline:none;
}  
`
export default function ProfileForm() {
    const { profile, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.profile
    )
    const {user} =useSelector((state)=>state.auth)
    const [address, setAddress] = useState(profile?profile.data.address:'')
    const [phone, setPhone] = useState(profile?profile.data.phone:'')
    const [price, setPrice] = useState(profile?profile.data.price:null)
    const [headline, setHeadline] = useState(profile?profile.data.headline:'')
    const dispatch = useDispatch()
    const submit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userId: user.data.id,
                headline,
                phone,
                price,
                address,
            }
            if (profile) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
                const response = await axios.put(`http://localhost:5000/api/profile/${user.data.id}`, data, config)
                if(response){
                    dispatch(show(user.data.id))
                }
            } else {
                dispatch(create(data))
            }
        } catch (error) {
            console.log("Unsuccessfull!")
        }
    }
    return (
        <div>

            <Form>
                <Label>Headline</Label>
                <Input defaultValue={profile ? profile.data.headline : " "} onChange={(e) => setHeadline(e.target.value)} ></Input>
                <Label>Location</Label>
                <Input defaultValue={profile ? profile.data.address : " "} onChange={(e) => setAddress(e.target.value)} ></Input>
                <Label >Phone number</Label>
                <Input defaultValue={profile ? profile.data.phone : " "} onChange={(e) => setPhone(e.target.value)} ></Input>
                <Label>Price per houre</Label>
                <Input defaultValue={profile ? profile.data.price : " "} onChange={(e) => setPrice(e.target.value)} ></Input>
                <Box textAlign='center' style={{ margin: "40px", }}>
                    <Button onClick={submit} variant="contained" style={{ width: '20%', }}>Save</Button>
                </Box>
            </Form>
        </div>
    )
}
