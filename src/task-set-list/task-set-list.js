import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TaskComponent from "../task/task-component";
import AddDeleteButtonGroup from "../create-task/add-delete-button-group";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 300,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    addTaskButton: {},
}));

function useEndpoint(req) {
    const [res, setRes] = useState({
        data: [],
        complete: false,
        pending: false,
        error: false
    });
    useEffect(
        () => {
            setRes({
                data: [],
                pending: true,
                error: false,
                complete: false
            });
            axios(req)
                .then(res =>
                    setRes({
                        data: res.data,
                        pending: false,
                        error: false,
                        complete: true
                    })
                )
                .catch(() =>
                    setRes({
                        data: [],
                        pending: false,
                        error: true,
                        complete: true
                    })
                );
        },
        [req.url]
    );
    return res;
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function TaskSetList() {

    const tasksUrl = "http://localhost:8080/task-set/get-task-sets";
    const reqData = useEndpoint({
        method: "GET",
        url: tasksUrl
    })
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(reqData.data)

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {reqData.data.map((item, index) => (
                    <Tab label={item.name} {...a11yProps(index)} />
                ))}
            </Tabs>
            {reqData.data.map((item, index) => (
                <TabPanel value={value} index={index}>

                    {
                        item.list.map(task => (
                            <TaskComponent id={task.id} task={task.name} completed={task.completed}/>
                        ))}
                    <AddDeleteButtonGroup className={classes.addTaskButton} taskSetId={item.id}/>
                </TabPanel>
            ))}
        </div>
    );
}
