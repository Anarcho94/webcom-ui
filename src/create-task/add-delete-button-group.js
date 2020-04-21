import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import DeleteTaskSet from "../delete-task-set/delete-task-set";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 33
    },
}));

export default function AddDeleteButtonGroup(props) {
    const classes = useStyles()

    const [saveData, setSaveData] = useState({
        taskSetId: props.taskSetId,
        name: '',
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        setSaveData({...saveData, [event.target.name]: event.target.value})
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/task/save', saveData)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        window.location.reload();
    }

    return (
        <div className={classes.root}>
            <Tooltip title="Add new task">
                <Button variant='contained' color='primary' onClick={handleClickOpen}><AddIcon/></Button>
            </Tooltip>
            <DeleteTaskSet taskSetId={props.taskSetId}/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new task</DialogTitle>
                <DialogContent>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <TextField id="name" name='name' label="Name of the task" value={saveData.name}
                                       onChange={handleChange}/>
                            <Button type='submit' variant="outlined" color="primary">
                                Save
                            </Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}