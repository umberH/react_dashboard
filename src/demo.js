import * as React from "react";
import { useState, useRef } from "react";
import DataGrids from "./table/DataGrids";
//import Upload from "./components/Upload";
import Papa from "papaparse";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import InsightsIcon from "@mui/icons-material/Insights";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import InputIcon from "@mui/icons-material/Input";
import ListSubheader from "@mui/material/ListSubheader";
import SendIcon from "@mui/icons-material/Send";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import StepConnector, {
  stepConnectorClasses
} from "@mui/material/StepConnector";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import BorderLinearProgress from "@mui/material/LinearProgress";
import * as d3 from "d3"; // we will need d3.js
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Plot from "react-plotly.js";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 10,
    label: "10%"
  },
  {
    value: 80,
    label: "80%"
  },
  {
    value: 30,
    label: "30%"
  }
];
function valuetext(value: number) {
  return `${value}%`;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const steps_cards = [
  {
    label: "Load Data/Model",

    description: `Please provide the data, model and the configuration file. The data File will have the data for the evidence dashboard. 
    Model File has the trained model file for model analysis. Configuration file provide additional information for the data transformation stages.`
  },
  {
    label: "Populate Data",
    description:
      "This form will upload the provided data and populate the data for interaction one or more ads which target a shared set of keywords."
  },
  {
    label: "Interactive Visualization",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  },
  {
    label: "Insights of the Model",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  },
  {
    label: "Download The Details",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`
  }
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4"
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <InputIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <PsychologyIcon />,
    5: <InsightsIcon />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const steps = [
  "Load Data/Model",
  "Populate Data",
  "Interactive Visualization",
  "Insights of the Model",
  "Download The Details"
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`
  }
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

export default function EvidenceDashboard() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const { funding, income_invoice, income_cash, income_cheq, other } = state;
  const [checked1, setChecked1] = React.useState(true);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [checked5, setChecked5] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("Upload File");
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [upload, setUpload] = React.useState();
  const maxSteps = steps_cards.length;
  // This state will store the parsed data
  const [data, setData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === -1) {
      setChecked1(true);
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
      setChecked5(false);
      setError("error");

      // Initialize a reader which allows user
      // to read any file or blob.
      const reader = new FileReader();

      // Event listener on reader when the file
      // loads, we parse it and set the data.
      console.log(file);
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        setData(columns);
      };
      reader.readAsText(file);
    }
    if (activeStep === 0) {
      setChecked1(true);
      setChecked2(true);
      setChecked3(false);
      setChecked4(false);
      setChecked5(false);
      console.log(file);
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        setData(columns);
      };
      reader.readAsText(file);
    }
    if (activeStep === 1) {
      setChecked1(false);
      setChecked2(false);
      setChecked3(true);
      setChecked4(false);
      setChecked5(false);
    }
    if (activeStep === 2) {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setChecked4(true);
      setChecked5(false);
    }
    if (activeStep === 3) {
      setChecked2(false);
      setChecked1(false);
      setChecked3(false);
      setChecked4(false);
      setChecked5(true);
    }
    //setChecked((prev) => !prev);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) {
      setChecked1(true);
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
      setChecked5(false);
    }
    if (activeStep === 2) {
      setChecked2(true);
      setChecked1(false);
      setChecked3(false);
      setChecked4(false);
      setChecked5(false);
    }
    if (activeStep === 3) {
      setChecked1(false);
      setChecked2(false);
      setChecked3(true);
      setChecked4(false);
      setChecked5(false);
    }
    if (activeStep === 4) {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setChecked4(true);
      setChecked5(false);
    }
    if (activeStep === 5) {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
      setChecked5(true);
    }
    //setOpen(!open);
    //setChecked((prev) => !prev);
  };
  const handleChangeFile = (event) => {
    if (event.target.files.length) {
      const inputFile = event.target.files[0];

      // If input type is correct set the state
      setFile(inputFile);
      console.log(event);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Stack sx={{ width: "100%" }} spacity={4}>
      <Paper>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{ minWidth: 1000 }}>
          <CardContent>
            <Card
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 80,
                pl: 2,
                bgcolor: "background.default"
              }}
            >
              {" "}
              {steps_cards[activeStep].description}
            </Card>

            <Box
              sx={{
                height: 400,
                pb: 10,
                margin: 2
              }}
              onClick={handleClick}
            >
              <Collapse
                orientation="horizontal"
                in={checked1}
                collapsedSize={2}
              >
                <Stack direction="column" spacing={4} alignItems="centre">
                  <Button variant="contained" component="label">
                    Upload Date File(s)
                    <input
                      hidden
                      id="dataFile"
                      accept=".csv,.xslx,.xls"
                      multiple
                      type="file"
                      name="datafile"
                      onChange={handleChangeFile}
                    />
                  </Button>
                  <Button variant="contained" component="label">
                    Upload Model
                    <input
                      hidden
                      id="modelFile"
                      accept=".pkl,.hd5"
                      multiple
                      type="file"
                      name="modelfile"
                    />
                  </Button>
                  <Button variant="contained" component="label">
                    Upload Model/Data Configuration(s)
                    <input
                      hidden
                      id="configFile"
                      accept=".json"
                      multiple
                      type="file"
                      name="configfile"
                    />
                  </Button>

                  <TextField label="files" id="file_list" disabled></TextField>
                </Stack>
                <div style={{ marginTop: "3rem" }}>
                  {error
                    ? error
                    : data.map((col, idx) => <div key={idx}>{col}</div>)}
                </div>
              </Collapse>
            </Box>
            <Box
              sx={{
                height: 400,
                pl: 50,
                mt: -62,
                pb: 10,
                alignItems: "center"
              }}
              onClick={handleClick}
            >
              <Collapse
                orientation="horizontal"
                in={checked2}
                collapsedSize={0}
              >
                <Grid container spacing={1}>
                  <Box
                    sx={{
                      pt: 1,
                      alignItems: "center",
                      minWidth: 400,
                      border: "1px solid black"
                    }}
                  >
                    <Stack spacing={3} direction="column">
                      <Typography fontSize="xl8" lineHeight={1}>
                        Model Statistics
                      </Typography>
                      <Typography fontSize="xl4" lineHeight={1}>
                        Correctly Classified
                      </Typography>
                      <Slider
                        aria-label="Custom marks"
                        defaultValue={78}
                        getAriaValueText={valuetext}
                        step={10}
                        valueLabelDisplay="on"
                        marks={marks}
                        color="secondary"
                      />

                      <Typography fontSize="xl4" lineHeight={1}>
                        Incorrectly Classified
                      </Typography>
                      <Slider
                        aria-label="Custom marks"
                        defaultValue={67}
                        getAriaValueText={valuetext}
                        step={10}
                        valueLabelDisplay="on"
                        marks={marks}
                        color="secondary"
                      />

                      <TextField
                        id="Precision"
                        label="Precision"
                        defaultValue="84.3%"
                        disabled
                      />
                      <TextField
                        id="Sensitivity"
                        label="Sensitivity"
                        defaultValue="67.24"
                        disabled
                      />
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      pl: 20,
                      alignItems: "center",
                      minWidth: 400
                    }}
                  >
                    <Stack spacing={2} direction="column">
                      <Typography fontSize="xl4" lineHeight={1}>
                        Classes identified in the model from data
                      </Typography>
                      <FormControl
                        sx={{ m: 3 }}
                        component="fieldset"
                        variant="standard"
                      >
                        <FormLabel component="legend">
                          Choose the options to fetch the data
                        </FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={funding}
                                onChange={handleChange}
                                name="invoice"
                              />
                            }
                            label="Funding"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={income_invoice}
                                onChange={handleChange}
                                name="invoice"
                              />
                            }
                            label="Income Invoice"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={income_cash}
                                onChange={handleChange}
                                name="cash"
                              />
                            }
                            label="Income Cash"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={income_cheq}
                                onChange={handleChange}
                                name="cheque"
                              />
                            }
                            label="Income Cheque"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={other}
                                onChange={handleChange}
                                name="Other"
                              />
                            }
                            label="Other"
                          />
                        </FormGroup>
                        <FormHelperText>
                          The data results will have the mix of these
                          classification
                        </FormHelperText>
                      </FormControl>
                      <Typography>
                        {" "}
                        Please enter a keyword to search in the data
                      </Typography>
                      <TextField></TextField>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="contains"
                            control={<Radio />}
                            label="Contains"
                          />
                          <FormControlLabel
                            value="exact"
                            control={<Radio />}
                            label="Exact"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Stack>
                  </Box>
                </Grid>
              </Collapse>
            </Box>

            <Box
              sx={{
                height: 400,
                pl: 5,
                mt: -62,
                pb: 10
              }}
              onClick={handleClick}
            >
              <div>
                <Collapse
                  orientation="horizontal"
                  in={checked3}
                  collapsedSize={0}
                >
                  <Grid container spacing={1}>
                    <Box
                      sx={{
                        height: 400,
                        width: 1200,
                        border: "1px Solid Black"
                      }}
                    >
                      {/* <DataGrid
                        experimentalFeatures={{ newEditingApi: true }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                      /> */}
                      <DataGrids />
                    </Box>
                  </Grid>
                </Collapse>
              </div>
            </Box>
            <Box
              sx={{
                height: 400,
                pl: 5,
                mt: -60,
                pb: 10
              }}
              onClick={handleClick}
            >
              <Collapse
                orientation="horizontal"
                in={checked4}
                collapsedSize={0}
              >
                <Plot
                  data={[
                    {
                      x: [1, 2, 3],
                      y: [2, 6, 3],
                      type: "box",
                      mode: "lines+markers",
                      marker: { color: "red" }
                    },
                    { type: "bar", x: [1, 2, 3], y: [2, 5, 3] }
                  ]}
                  layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
                />
                <Plot
                  data={[
                    {
                      x: [1, 2, 3],
                      y: [2, 6, 3],
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "red" }
                    },
                    { type: "bar", x: [1, 2, 3], y: [2, 5, 3] }
                  ]}
                  layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
                />
              </Collapse>
            </Box>

            <Box
              sx={{
                height: 400,
                pl: 5,
                mt: -60,
                pb: 10,
                border: "1px dashed grey"
              }}
              onClick={handleClick}
            >
              <Collapse
                orientation="horizontal"
                in={checked5}
                collapsedSize={0}
              >
                <Plot
                  data={[
                    {
                      x: [2, 3],
                      y: [2, 6, 3],
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "red" }
                    },
                    { type: "bar", x: [2, 3], y: [2, 5, 3] }
                  ]}
                  layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
                />
              </Collapse>
            </Box>

            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </CardContent>
        </Card>

        {/* <Box sx={{ width: "75%", height: 700 }}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
          />

          <Box
            sx={{
              "& > :not(style)": {
                display: "flex",
                justifyContent: "space-around",
                height: 120,
                width: 250
              }
            }}
          >
            <div>
              <Collapse in={checked}>{icon}</Collapse>
              <Collapse in={checked} collapsedSize={40}>
                {icon}
              </Collapse>
            </div>
            <div>
              <Box sx={{ width: "50%", height: 700 }} onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </Box>
              <Collapse
                orientation="horizontal"
                in={open}
                timeout="auto"
                unmountOnExit
              >
                {icon}
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>

              <Box sx={{ width: "50%" }}>
                <Collapse
                  orientation="horizontal"
                  in={checked}
                  collapsedSize={40}
                >
                  {icon}
                </Collapse>
              </Box>
            </div>
          </Box>
        </Box> */}
      </Paper>
    </Stack>
  );
}
