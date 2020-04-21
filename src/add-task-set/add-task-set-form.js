import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios'

export default function AddTaskSetForm() {
    const [saveData, setSaveData] = useState({
        name: '',
    });


    const handleChange = (event) => {
        setSaveData({...saveData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/task-set/save', saveData)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        window.location.reload();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField id="name" name='name' label="Name of the task list" value={saveData.name}
                           onChange={handleChange}/>
                <Button type='submit' variant="outlined" color="primary">
                    Save
                </Button>
            </form>
        </div>
    )
}