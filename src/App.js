import React from 'react';
import TaskList from "./task-set-list/task-set-list";
import {makeStyles} from "@material-ui/core/styles";
import AddTaskSetForm from "./add-task-set/add-task-set-form";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    header: {
        margin: 0,
        backgroundColor: '#3f51b5',
        minHeight: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        color: 'white',
    },
    addButton: {
        width: 160,
    }
}));

export default function App() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h1 className={classes.header}>Task manager</h1>
            <TaskList/>
            <div>
                <Tooltip title="Add task list">
                    <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
                        <AddIcon fontSize='large'/>
                    </Button>
                </Tooltip>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New task list</DialogTitle>
                <DialogContent>
                    <AddTaskSetForm/>
                </DialogContent>
            </Dialog>
        </div>
    );
}