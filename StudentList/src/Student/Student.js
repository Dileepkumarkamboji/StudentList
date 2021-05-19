import React, { useEffect, useState } from 'react'
import * as Service from "./Service";
import StudentForm from './StudentForm';
import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button } from '@material-ui/core';
const initialState = {
    id: 0,
    name: "",
    school: "",
    Gender: "male",
  };
const useStyle = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& MuiTableHead-root': {
            fontWeight: '600',
            colour: theme.palette.primary.main,
            backgroundColour: theme.palette.primary.light,
            colour: 'red',
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColour: '#fffbf2',
            cursor: 'pointer'
        },
    }
}))

function Student() {
    const [list, setList] = useState(Service.getAllStudents());
    const [recordForEdit,setRecordForEdit]=useState();
    const [values, setValues] = useState(initialState);


    const classes = useStyle();
    console.log(list, "list");

    const openInPopup =(item)=>{
        setRecordForEdit(item);
       
    }
    const handleDelete=id=>{
        console.log(id);
        Service.deleteStudent(id);
        setList(Service.getAllStudents());
    }

    useEffect(() => {
        setList(Service.getAllStudents());
    },[list])
    return (
        <div>
            <h1>Student Table </h1>
            <Table className={classes.root}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>School</TableCell>
                        <TableCell>actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        list.map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.school}</TableCell>
                            <TableCell>
                                <Button color="primary" 
                                onClick={()=>{openInPopup(item)}}
                                >Edit</Button>
                                <Button color="secondary" 
                                onClick={()=>{handleDelete(item.id)}}>Delete</Button>
                            </TableCell>
                        </TableRow>
                        ))
                    }

                </TableBody>

            </Table>
            <StudentForm recordForEdit={recordForEdit} />
        </div>
    )
}

export default Student
