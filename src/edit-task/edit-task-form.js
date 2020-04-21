import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";

export default function EditTaskForm(props) {

    const [editData, setEditData] = useState({
        id: props.id,
        name: props.name,
        completed: props.completed
    });


    const handleChange = (event) => {
        console.log(event.target.name + ' : ' + event.target.checked)
        setEditData({...editData, [event.target.name]: event.target.value})
    }
    const checkBoxHandle = () => {
        setEditData({...editData, completed: !editData.completed})
        console.log(editData.completed)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8080/task/update', editData)
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
                <div>
                    <Checkbox name='completed'
                              checked={editData.completed}
                              onChange={checkBoxHandle}
                              color="primary"/>
                    <TextField id={editData.id}
                               name='name'
                               label="Write the task"
                               value={editData.name}
                               onChange={handleChange}/>
                    <Button type='submit' variant="outlined" color="primary">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}