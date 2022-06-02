import { Button } from '@mui/material'
import React from 'react'

export default function () {
    return (
        <div>
           
            <form>
                <label>Selec PDF file</label>
                <input type="file" id="files" name="files" multiple />
                <Button variant='contained'>Submit</Button>
            </form>
        </div>
    )
}
