import React from "react";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/Clear';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import DialogContentText from "@material-ui/core/DialogContentText";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        marginLeft: 5
    }
}));

export default function DeleteTaskSet(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.delete('http://localhost:8080/task-set/delete/' + props.taskSetId)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        window.location.reload();
    }

    return (
        <span className={classes.deleteButton}>
            <Tooltip title="Delete task list">
                 <Button variant='outlined' color='secondary' onClick={handleClickOpen}>
                     <ClearIcon/>
                 </Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete task list</DialogTitle>
                 <DialogContentText id="alert-dialog-slide-description">
                     Are you sure you want to delete task list?
                  </DialogContentText>
                <DialogContent>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <Button type='submit' variant="outlined" color="primary">
                                Yes
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleClose}>
                                No
                            </Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </span>
    )

}