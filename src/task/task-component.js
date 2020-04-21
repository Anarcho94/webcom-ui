import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import EditTaskForm from "../edit-task/edit-task-form";
import ClearIcon from '@material-ui/icons/Clear';
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minWidth: 500,
        marginBottom: 10,
        justifyContent: 'space-around'
    },
    text: {},
    editButton: {
        marginLeft: 20
    },
    deleteButton: {
        marginLeft: 5
    },
    crossedText: {
        textDecoration: 'line-through',
        color: 'grey',
    }
}))

export default function TaskComponent(props) {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (e) => {
        e.preventDefault()

        axios.delete('http://localhost:8080/task/delete/' + props.id)
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
            <Checkbox
                checked={props.completed}
                name={props.task}
                color="primary"
            />
            <span className={props.completed ? classes.crossedText : classes.text}>{props.task}</span>
            <div>
                <Tooltip title="Edit task">
                    <Button className={classes.editButton} variant="contained" color="primary"
                            onClick={handleClickOpen}>edit</Button>
                </Tooltip>
                <Tooltip title="Delete task">
                    <Button className={classes.deleteButton} variant="contained" color="secondary"
                            onClick={handleDelete}>
                        <ClearIcon/>
                    </Button>
                </Tooltip>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit task list: {props.task}</DialogTitle>
                <DialogContent>
                    <EditTaskForm id={props.id} name={props.task} completed={props.completed}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}