import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState, state, setState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withFirebase } from '../Firebase';
import InputSlider from './Slider';
import InfoIcon from '@material-ui/icons/Info';
import TransferList from './TransferList';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PieCharts from '../Dashboard/PieCharts';
import { Slide, Slider } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { AuthUserContext } from "../Session";
import EditGoalPage from '../SubAccounts/EditGoalPage';
import EditIcon from "@material-ui/icons/Edit";
import FullScreenDialog from './FullScreenDialog';
import StrategyButton from './StrategyButton';
import Box from '@material-ui/core/Box';
import TickerPopup from './TickerPopup';

function NewPlan(props) {
    console.log(props)
    const [name, setName] = useState("");
    const [desc,setDesc] = useState("");
    const [ptype,setType] = useState("");
    const [risk, setRisk] = useState("");
    const [holdings, setHoldings] = useState([]);
    const [id, setId] = useState(0);
    const [mutualFundNum, setMutualFundNum] = useState(0);
    const [chosen, setChosen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [select, setSelect] = useState([]);
    const [cv, setCv] = useState("");

    const handleClickOpen = () => {
      if (chosen) setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSelected = (selected) => {
      console.log("is elected" + selected);
      setChosen(selected.length != 0);
      setSelect(selected);
    };

    const passback = (vals) => {


    };

    const onCreate = () => {
      console.log(ptype)
      props.firebase.plans(props.authUser.uid).push({
        name: name,
        desc: desc,
        userId: props.authUser.uid,
        type: ptype,
        risk: risk,
        holdings: holdings,
        createdAt: props.firebase.serverValue.TIMESTAMP,
      });  
      props.back()
    };

  return (
    <React.Fragment>
      <AuthUserContext.Consumer>
        {authUser => (
        <div>
          <br></br>
          <Typography variant="h2" gutterBottom>
            Building a new Investment Plan
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                label="Investment Plan Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                onChange={(e) => setDesc(e.target.value)}
                label="Investment Plan Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3">Step 1: Think About How You Will Invest</Typography>
                <Typography variant="body" style={{
                    marginBottom: 40
                }}> Think about what approach you want to use when investing. Are you going to take a thematic or sector approach? With a thematic approach, you invest long-term in an idea as it changes
                and develops across a variety of sectors. On the other hand, a sector approach is one where you invest in businesses within a certain sector of the economy. Once you know <i>what</i> you want to invest in, you are ready
                to figure out <i>how</i>.
                </Typography>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="type-label">Strategy</InputLabel>
                <Select
                labelId="type-label"
                id="type"
                onChange={(e) => {setType(e.target.value)}}
                // onChange={(e) => console.log(e.target.value)}
                //onChange={(e) => setId(-(id))}
                style={{
                  width: 100,
                }}
                >
                    <MenuItem value={"Thematic"} onClick={(e) => setId(1)}>Thematic</MenuItem> 
                    <MenuItem value={"Sector"} onClick={(e) => setId(0)}>Sector</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3">Step 2: Choose Where You Will Invest</Typography>
                <Typography variant="h4">Select What You Want to Invest In</Typography>
                <InfoIcon style={{
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10
                }}></InfoIcon>
                <Typography variant="body" style={{
                  marginTop: 10
                }}>Type in the name of the ticker you would like to invest in. If you want to see a list of options, click on the 'Ticker Options' button and then type the name in as you see it.</Typography>
            </Grid>

            <Grid item xs={12}>
              {/* <TickerPopup></TickerPopup> */}
              <Button variant="outlined" color="secondary" onClick={ function () {
                      window.open(
                        "https://finance.yahoo.com/trending-tickers"
                      )
              }}>
                <Typography variant="button">
                  Ticker Options
                </Typography>
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div style={{ width: '100%' }}>
                {holdings.map((v) => {
                  // console.log(v);
                  return(
                    <Box component="div" display="inline" p={1} m={1} bgcolor="grey">
                      {v}
                    </Box>
                  );
                })}
              </div>

              <TextField
                  id="added"
                  name="Add Security"
                  onChange={(e) => setCv(e.target.value.toUpperCase())}
                  label="TICKER"
                  value={cv}
                  onKeyPress={(e) => {
                    console.log(`Pressed keyCode ${e.key}`);
                    if (e.key === 'Enter') {
                      holdings.push(e.target.value);
                      setHoldings(holdings);
                      console.log(holdings);
                      setCv("");
                      // e.preventDefault();
                    }
                  }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3">Step 3: Choose The Risk</Typography>
                <InfoIcon></InfoIcon>
                <Typography variant="body">Choose how you want to invest: conservatively, moderately, or aggressively. Your decision will determine your specific bond/stock 
                bundle.</Typography>
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel id="type-label">Risk Level</InputLabel>
                <Select
                labelId="type-label"
                id="type"
                onChange={(e) => setRisk(e.target.value)}
                >
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
                style={{
                  marginTop: 50
                }}
                onClick={onCreate}
              >
                Create Plan
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </AuthUserContext.Consumer>
    </React.Fragment>
  );
}

export default withFirebase(NewPlan);