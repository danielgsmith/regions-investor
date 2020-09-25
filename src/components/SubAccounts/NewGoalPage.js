import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { withFirebase } from '../Firebase';

function NewGoalPage(props) {
    // console.log(props.authUser)
    const [name,setName] = useState("")
    const [goal,setGoal] = useState(0)
    const [desc,setDesc] = useState("")
    const [init,setInit] = useState(0)
    const [date,setDate] = useState("")
    const [type,setType] = useState("")
    const updateData = (e) =>{
        props.firebase.mainAccounts(props.authUser.uid).push(
            {
                name: name || "",
                goalAmount: goal || "",
                description: desc || "",
                currentAccountValue: init || "",
                goalDate: date || "",
                investmentStyle: type || ""
            });
        props.back();
    }
  return (
    <React.Fragment>
      <br></br>
      <Typography variant="h6" gutterBottom>
        Create New Goal
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            label="Goal Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="goal"
            name="goal"
            label="Goal Ammount"
            onChange={(e) => setGoal(e.target.value)}
            fullWidth
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="init"
            name="init"
            label="Initial Deposit"
            onChange={(e) => setInit(e.target.value)}
            fullWidth
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="desc"
            name="desc"
            label="Goal Description"
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required
            id="date" 
            onChange={(e) => setDate(e.target.value)}
            name="date"
            label="Goal Date" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Plan</InputLabel>
            <Select
            labelId="type-label"
            id="type"
            onChange={(e) => setType(e.target.value)}
            >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"Conservative"}>Conservative</MenuItem>
                <MenuItem value={"Moderate"}>Moderate</MenuItem>
                <MenuItem value={"Aggresive"}>Aggresive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            onClick={updateData}
          >
            Create Goal
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withFirebase(NewGoalPage);