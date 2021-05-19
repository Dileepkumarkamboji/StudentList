import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
// import AddIcon from '@material-ui/icons/Add'
import * as Service from "./Service";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(0.5),
  },
}));

const initialState = {
  id: 0,
  name: "",
  school: "",
  Gender: "male",
};
function StudentForm(recordForEdit) {
  const [values, setValues] = useState(initialState);
  const [openPopup, setOpenPop] = useState(false);
  const [list,setList] =useState(Service.getAllStudents());
  const classes = useStyle();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Service.insertStudent(values);
    resetForm();
    setOpenPop(false);
    setList(Service.getAllStudents());
    console.log(list);
  };
  const resetForm = () => {
    setValues(initialState);
  };
  const handleNewStudent = () => {
    setOpenPop(true);
  };
  const handleRemove =()=>{
      setOpenPop(false);
  }

  return (
    <div>
      <Dialog open={openPopup}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Id"
                  name="id"
                  value={values.id}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  label="School"
                  name="school"
                  value={values.school}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    name="Gender"
                    value={values.Gender}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />

                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="others"
                      control={<Radio />}
                      label="others"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  className={classes.button}
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  size="large"
                  type="reset"
                  onClick={resetForm}
                >
                  Reset
                </Button>
                <Button
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                  size="large"
                  type="reset"
                  text="X"
                  onClick={handleRemove}
                >Cancel</Button>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
      <Button
        className={classes.button}
        variant="contained"
        size="large"
        type="submit"
        // startIcon={<AddIcon />}
        onClick={handleNewStudent}
      >
        Add Student
      </Button>
    </div>
  );
}

export default StudentForm;
