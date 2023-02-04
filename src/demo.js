import * as React from "react";
import { useState, useRef, useEffect } from "react";
import DataGrids from "./Table/DataGrids";
//import from "./Components/Upload";
import Backdrop from "@mui/material/Backdrop";
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
//import { readString } from "react-papaparse";
//import siteListCSV from "./data.csv";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

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
    label: "Model Statistics",
    description: "Statistics from the given model"
  },
  {
    label: "Populate Data",
    description:
      "This form will upload the provided data and populate the data for interaction one or more ads which target a shared set of keywords."
  },
  {
    label: "Interactive Visualization",
    description: `Visualization Stage`
  },
  {
    label: "Insights"
    //description: `Insights into model features and the behaviour`
  },
  {
    label: "Download The Details",
    description: `Download the track`
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
    boxShadow: "0 4px 10px 0 rgb(0,0,0,.25)"
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
    5: <InsightsIcon />,
    6: <DraftsIcon />
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
  "Model Statistics",
  "Populate Data",
  "Interactive Visualization",
  "Insights of the Model",
  "Download The Details"
];

//const [tableData, setTableData] = useState([]);

export default function CustomizedSteppers() {
  const icons = {
    0: <InputIcon />,
    1: <GroupAddIcon />,
    2: <VideoLabelIcon />,
    3: <PsychologyIcon />,
    4: <InsightsIcon />,
    5: <DraftsIcon />
  };

  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //const [headers, setHeaders] = useState([]);
  //const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    // Papa.parse("data.csv", {
    //   download: true,
    //   header: true,
    //   complete: (results) => {
    //     //console.log("Here");
    //     console.log('here',results.data);
    //     setTableData(results.data);
    //   }
    // });
    Papa.parse("./data.csv", {
      download: true,
      header: true,
      complete: (data) => {
        setTableData(data.data);
        console.log(tableData.map((a) => a.applicationid));
        console.log("here", data.data);
      }
    });
    //setHeaders(Object.keys(data[0]));
  }, []);
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
  const [openBack, setOpenBack] = React.useState(false);
  const [name, setName] = React.useState("Upload File");
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [upload, setUpload] = React.useState();
  const maxSteps = steps_cards.length;
  // This state will store the parsed data

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  //d3.csv("sample.csv", (d) => {
  //console.log(d)
  //})

  const handleNext = () => {
    console.log("Next");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0) {
      console.log("change page");
      //const papaConfig = {
      // complete: (results, file) => {
      // setData(results.data);
      //console.log("Parsing complete:", results, file);
      //},
      //download: true,
      //error: (error, file) => {
      //console.log("Error while parsing:", error, file);
      //}
      //};
      //console.log("here");
      //console.log(data);
      //readString(siteListCSV, papaConfig);
      setChecked1(true);
      setChecked2(true);
      setChecked3(false);
      setChecked4(false);
      setChecked5(false);
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
      setChecked1(true);
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
      //console.log(event);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClose = () => {
    setOpenBack(false);
  };

  const backDrop = () => {
    setOpenBack(!openBack);
  };
  const handleClick = () => {
    //setOpen(!open);
  };
  return (
    <Stack sx={{ width: "100%" }} spacity={4}>
      <Paper>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" })
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" noWrap component="div">
                Interactive Evidence Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {[
                "Upload",
                "Model Stats",
                "Data",
                "Model Insights",
                "Feature Insights"
              ].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center"
                      }}
                    >
                      {icons[index]}
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "20px" }}
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {[
                "Model Classes",
                "Funding",
                "Income-invoice",
                "Income-cash",
                "Income Cheque",
                "Other"
              ].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "20px" }}
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />

            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
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

            <Card sx={{ minWidth: 100 }}>
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
                    height: 600,
                    pb: 10,
                    margin: 2
                  }}
                >
                  <Collapse
                    orientation="horizontal"
                    in={checked1}
                    collapsedSize={0}
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
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Model Type
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Supervised"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="UnSupervised"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Regression"
                          />
                          <FormControlLabel
                            //value="disabled"
                            disabled
                            control={<Radio />}
                            label="other"
                          />
                        </RadioGroup>
                      </FormControl>
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

                      {/* <TextField
                        label="data.csv, model.pkl , config.json"
                        id="file_list"
                        disabled
                      >
                        {" "}
                      </TextField> */}
                    </Stack>
                  </Collapse>
                </Box>
                <Box
                  sx={{
                    height: 600,
                    pl: 80,
                    mt: -50,
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
                          minWidth: 400
                        }}
                      >
                        <Stack spacing={3} direction="column">
                          <Typography fontSize="xl8" lineHeight={1}>
                            Model Statistics
                          </Typography>

                          <Plot
                            data={[
                              {
                                x: [
                                  "funding",
                                  "invoice",
                                  "cash",
                                  "cheque",
                                  "other"
                                ],
                                y: [
                                  "funding",
                                  "invoice",
                                  "cash",
                                  "cheque",
                                  "other"
                                ],
                                z: [
                                  [0.5, 0.05, 0.2, 0.05, 0.2],
                                  [0.0, 0.8, 0.1, 0.0, 0.1],
                                  [0.0, 0.1, 0.8, 0.05, 0.05],
                                  [0.05, 0.1, 0.2, 0.6, 0.05],
                                  [0.03, 0.4, 0.5, 0.02, 0.5]
                                ],
                                type: "heatmap",
                                colorscale: "RdBu",
                                //[0, "#006f3f"],//"#80972"],
                                //[1, "#00f3f"]
                                //],
                                //showscale: false,
                                hoverongaps: false
                              }
                            ]}
                            layout={{
                              xanchor: "center",
                              title: {
                                //xanchor: "center",
                                text: "Confusion Matrix",
                                automargin: false,
                                font: {
                                  //family: "Courier New, monospace",
                                  size: 18
                                },
                                //xref: "paper",
                                x: 0.5,
                                yref: "container",
                                y: 0.8
                              },
                              //title: "Confusion Matrix",
                              width: 340,
                              height: 340,
                              annotations: [],

                              xaxis: {
                                //title:""
                                ticks: "",
                                side: "bottom",
                                font: { size: 14 }
                              },
                              yaxis: {
                                ticks: "",
                                ticksuffix: " ",
                                font: { size: 14 }
                              }
                            }}
                          />
                        </Stack>
                      </Box>

                      <Box
                        sx={{
                          pl: 15,
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
                    height: 600
                    //pl: 5,
                    // mt: -87,
                    //pb: 9
                  }}
                  onClick={handleClick}
                >
                  <Collapse
                    orientation="horizontal"
                    in={checked3}
                    collapsedSize={0}
                  >
                    <Box
                      sx={{
                        height: 400,
                        mt: -100,
                        width: 400
                        // border: "1px Solid"
                      }}
                    >
                      {/*  <DataGrid
                        experimentalFeatures={{
                          newEditingApi: true,
                          lazyLoading: true
                        }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                      />*/}

                      <DataGrids data={tableData} />
                    </Box>
                  </Collapse>
                </Box>
                <Box
                  sx={{
                    height: 800,
                    pl: 5,
                    mt: -182,
                    pb: 10
                    // border: "1px dashed"
                  }}
                  onClick={handleClick}
                >
                  <Collapse
                    orientation="horizontal"
                    in={checked4}
                    collapsedSize={800}
                  >
                    <Grid
                      container
                      spacing={0}
                      sx={
                        {
                          //border: "1px Solid Black"
                        }
                      }
                    >
                      {/* <Grid>
                    <Table headers={headers} data={data} />
                </Grid>*/}
                      <Grid
                        sx={
                          {
                            //border: "1px Solid Black"
                            //Height: 300,
                            //Width: 300
                          }
                        }
                      >
                        <Plot
                          data={[
                            {
                              type: "bar",

                              y: [
                                "Finance",
                                "Wholesale",
                                "Services",
                                "Retail",
                                "Hospitality",
                                "Trade",
                                "Building",
                                "Transport",
                                "Beauty",
                                "Lifestyle"
                              ],
                              x: [5, 9, 23, 15, 12, 20, 5, 4, 3, 2, 3], // 100%
                              orientation: "h",
                              marker: {
                                color: "rgba(230,4,51,0.6)"
                                //width: 0.5
                              }
                            }
                          ]}
                          layout={{
                            font: { size: 16 },
                            automargin: "height+width+center",
                            width: 350,
                            height: 370,

                            //xanchor: "center",
                            bargap: 0.3,
                            //showlegend: true,
                            title: {
                              //xanchor: "center",
                              text: "Applications Per Industry (%)",
                              //automargin: false,
                              font: {
                                //family: "Courier New, monospace",
                                size: 20
                              }
                              //xref: "paper",
                              //x: 0.05
                              // yref: "container",
                              //y: 0.85
                            },
                            xaxis: {
                              title: {
                                text: "Number of Applications",
                                font: {
                                  //family: "Courier New, monospace",
                                  size: 18
                                  //color: "#7f7f7f"
                                }
                              }
                            },
                            yaxis: {
                              tickangle: -30,
                              //side: "right",
                              title: {
                                // text: "Industry",
                                font: {
                                  //family: "Courier New, monospace",
                                  size: 18,
                                  color: "#7f7f7f"
                                }
                              }
                              /// xref: "paper",
                              /// x: 0.0
                            }
                          }}
                        />
                      </Grid>

                      <Grid
                        sx={
                          {
                            //border: "1px Solid Black"
                          }
                        }
                      >
                        <Plot
                          data={[
                            {
                              x: [
                                "2019-05-11 00:00:00",
                                "2019-05-26 00:00:00",
                                "2019-06-06 00:00:00",
                                "2019-06-13 00:00:00",
                                "2019-06-14 00:00:00",
                                "2019-06-28 00:00:00",
                                "2019-07-03 00:00:00",
                                "2019-07-11 00:00:00",
                                "2019-07-19 00:00:00",
                                "2019-08-04 00:00:00",
                                "2019-08-15 00:00:00",
                                "2019-08-16 00:00:00",
                                "2019-10-04 22:23:00",
                                "2019-11-04 22:23:00",
                                "2019-12-11 00:00:00",
                                "2020-02-04 22:23:00",
                                "2020-03-11 00:00:00",
                                "2020-05-26 00:00:00",
                                "2020-06-06 00:00:00",
                                "2020-06-13 00:00:00",
                                "2020-06-14 00:00:00",
                                "2020-06-28 00:00:00",
                                "2020-07-03 00:00:00",
                                "2020-07-11 00:00:00",
                                "2020-07-19 00:00:00",
                                "2020-08-04 00:00:00",
                                "2020-08-15 00:00:00",
                                "2020-08-16 00:00:00",
                                "2020-10-04 22:23:00",
                                "2020-11-04 22:23:00",
                                "2020-12-04 22:23:00"
                                //tableData.map((a) => a.date)
                                //{tableData.map((e)=>{
                                // reHeightturn (
                                //<tableData name={e.transactiondate} />
                                //);})}
                              ],
                              y: [
                                1000,
                                335,
                                165,
                                117.61,
                                1400.23,
                                315,
                                44.06,
                                517.44,
                                52.5,
                                198,
                                570,
                                670.7,
                                100,
                                350,
                                1902,
                                1146.05,
                                1110.27,
                                1000,
                                335,
                                165,
                                117.61,
                                1400.23,
                                315,
                                44.06,
                                517.44,
                                52.5,
                                198,
                                100,
                                350,
                                1902,
                                1146.05,
                                1110.27
                                //tableData.map((a) => a.transactionamount)
                              ],
                              type: "scatter"
                              //mode: "markers",
                              //marker: { size: 20, symbol: ["square-open"] }
                            }
                          ]}
                          layout={{
                            title: {
                              text: "Transaction Log",
                              font: { size: 20 }
                              //x: 0.05,
                              //yref: "container",
                              //y: 0.85
                            },
                            font: { size: 16 },
                            automargin: "height+width+center",
                            //autosize: true,
                            width: 350,

                            height: 400,

                            xaxis: {
                              title: {
                                text: "Transaction Date",
                                font: { size: 18 }
                              },
                              range: ["2019-07-01", "2020-12-31"],
                              type: "date",
                              rangeselector: {
                                buttons: [
                                  {
                                    count: 1,
                                    label: "1m",
                                    step: "month",
                                    stepmode: "backward"
                                  },
                                  {
                                    count: 6,
                                    label: "6m",
                                    step: "month",
                                    stepmode: "backward"
                                  },
                                  { step: "all" }
                                ]
                              },
                              rangeslider: {
                                range: ["2020-02-17", "2020-08-16"]
                              }
                            },
                            yaxis: {
                              autorange: true,
                              title: {
                                text: "Transacion Amount",
                                font: { size: 18 }
                              },

                              type: "linear"
                            }
                          }}
                        />
                      </Grid>
                      <Grid //sx={{ border: "1px Solid Black" }}
                      >
                        <Plot
                          data={[
                            {
                              type: "parcoords",
                              line: {
                                color: "blue"
                              },

                              dimensions: [
                                {
                                  range: [50, 500],
                                  constraintrange: [100, 150],
                                  label: "Amount",

                                  values: [
                                    64,
                                    100,
                                    200,
                                    200,
                                    302,
                                    500,
                                    350,
                                    500,
                                    300
                                  ]
                                },
                                {
                                  range: [1, 10],
                                  label: "Bank",
                                  values: [3, 1, 4, 2, 1, 7, 8, 5, 9, 2, 1, 9],
                                  tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                                },
                                {
                                  range: [1, 5],
                                  label: "Industry",
                                  values: [2, 4, 1, 4, 5, 3, 2, 1, 2],
                                  tickvals: [1, 2, 3, 4, 5],
                                  ticktext: ["Ret", "Bty", "Fin", "Ser", "Hos"]
                                },
                                {
                                  range: [1, 5],
                                  label: "Date",
                                  values: [4, 2, 1, 3, 5, 7, 6, 3, 5]
                                },
                                {
                                  range: [0, 1],
                                  label: "Prob.",
                                  values: [
                                    0.4,
                                    0.2,
                                    0.1,
                                    0.3,
                                    0.5,
                                    0.7,
                                    0.6,
                                    0.3,
                                    0.5
                                  ]
                                }
                              ]
                            }
                          ]}
                          layout={{
                            title: {
                              text: "Interaction Log",
                              font: { size: 20 },
                              automargin: "height+width+center"
                              //x: 0.05,
                              //yref: "container",
                              //y: 0.85
                            },
                            //mt: 20,
                            //yref: "container",
                            //y: 1000,
                            font: { size: 16 },
                            //autosize: true,
                            width: 350,

                            height: 370,
                            annotations: [{ font: { size: 16 } }]
                          }}
                        />
                      </Grid>
                      <Grid>
                        <Plot
                          data={[
                            {
                              x: [
                                4,
                                10,
                                20,
                                15,
                                20,
                                7,
                                8,
                                6,
                                10,
                                20,
                                0,
                                4,
                                10,
                                20,
                                10,
                                10,
                                10
                              ],
                              y: [2, 4, 7, 2, 4, 7, 2, 4, 7, 2, 4, 7, 3, 3, 3],
                              z: [0, 5, 6, 4, 5, 6, 4, 5, 6, 3, 5, 5, 5, 10, 6],
                              mode: "markers",
                              type: "scatter3d",
                              marker: {
                                colorscale: "YlOrRd",
                                showscale: "true",
                                colorbar: { x: 20 },

                                // color: "rgb(23, 190, 207)",
                                size: [
                                  28.666666666666668,
                                  20.666666666666668,
                                  15.333333333333334,
                                  17.666666666666668,
                                  19.0,
                                  17.666666666666668,
                                  26.0,
                                  21.0,
                                  21.666666666666668,
                                  27.0,
                                  21.666666666666668,
                                  16.666666666666668,
                                  27.0,
                                  14.0,
                                  29.666666666666668,
                                  22.0,
                                  16.0,
                                  28.0,
                                  27.0,
                                  25.333333333333332
                                ],
                                cmax: 0,
                                cmin: 100,
                                color: [
                                  28.666666666666668,
                                  20.666666666666668,
                                  15.333333333333334,
                                  17.666666666666668,
                                  19.0,
                                  17.666666666666668,
                                  26.0,
                                  21.0,
                                  21.666666666666668,
                                  27.0,
                                  21.666666666666668,
                                  16.666666666666668,
                                  27.0,
                                  14.0,
                                  29.666666666666668,
                                  22.0,
                                  16.0,
                                  28.0,
                                  27.0,
                                  25.333333333333332
                                ],
                                colorscale: "Viridis"
                              },
                              x: [
                                630,
                                310,
                                260,
                                566,
                                566,
                                400,
                                515,
                                630,
                                151,
                                400,
                                515,
                                176,
                                230,
                                260,
                                151,
                                648,
                                648,
                                176,
                                230,
                                310
                              ],
                              y: [
                                200,
                                100,
                                200,
                                100,
                                200,
                                100,
                                100,
                                100,
                                200,
                                200,
                                200,
                                200.1234,
                                200,
                                100,
                                100,
                                200,
                                100,
                                100,
                                100,
                                200
                              ],
                              z: [
                                495,
                                18,
                                104,
                                33,
                                33,
                                615,
                                10,
                                495,
                                420,
                                615,
                                10,
                                232,
                                515,
                                104,
                                420,
                                327,
                                327,
                                232,
                                515,
                                18
                              ]
                            },
                            {
                              alphahull: 7,
                              opacity: 0.1,
                              type: "scatter3d"
                              //x: [0, 100, 10],
                              // y: [0, 50, 10],
                              //z: [0, 10, 0.1]
                            }
                          ]}
                          layout={{
                            fontsize: 18,
                            // autosize: true,
                            //height: 480,
                            scene: {
                              // aspectratio: {
                              //    x: 1,
                              //   y: 1,
                              //  z: 1
                              // },

                              xaxis: {
                                title: { text: "Industry" },
                                type: "linear",
                                zeroline: false
                              },
                              yaxis: {
                                title: { text: "Bank" },
                                type: "linear",
                                zeroline: false
                              },
                              zaxis: {
                                type: "linear",
                                zeroline: false
                              }
                            },
                            title: {
                              text: "Clustering Neighbours",
                              font: { size: 20 }
                            },
                            width: 350,
                            height: 400
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>

                <Box
                  sx={{
                    height: 700,
                    width: 600,
                    pl: 5,
                    mt: -98,
                    pb: 10
                    //border: "1px dashed grey"
                  }}
                  onClick={handleClick}
                >
                  <Collapse
                    orientation="horizontal"
                    in={checked5}
                    collapsedSize={0}
                  >
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        pl: 100,
                        pt: -3 //border: "1px solid"
                      }}
                    >
                      <Grid>
                        <Plot
                          data={[
                            {
                              x: [6, 4, 9, 5, 7, 3],
                              y: [1.5, 1.8, 1.4, 1.6, 1.7, 1.2],
                              //size: "x",
                              // xaxis: "x1",
                              // yaxis: "y1",
                              type: "scatter",
                              mode: "markers",
                              marker: {
                                size: 12,

                                symbol: ["square", "square", "square"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [4, 5, 7, 3, 4, 6, 2],
                              y: [1.5, 1.8, 1.4, 1.6, 1.7, 1.2],
                              xaxis: "x2",
                              yaxis: "y2",
                              type: "scatter",
                              mode: "markers",
                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [1.2, 1.8, 1.7, 1.6, 1.4, 1.5],
                              y: [1.5, 1.8, 1.4, 1.6, 1.7, 1.2],
                              xaxis: "x3",
                              yaxis: "y3",
                              type: "scatter",
                              mode: "markers",
                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [5, 10, 7, 29, 20, 30],
                              y: [1.5, 1.8, 1.4, 1.6, 1.7, 1.2],
                              xaxis: "x4",
                              yaxis: "y4",
                              type: "scatter",
                              mode: "markers",

                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [6, 4, 9, 5, 7, 3],
                              y: [5, 10, 7, 29, 20, 30],
                              xaxis: "x5",
                              yaxis: "y5",
                              type: "scatter",
                              mode: "markers",

                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [4, 5, 7, 3, 4, 6, 2],
                              y: [5, 10, 7, 29, 20, 30],
                              xaxis: "x6",
                              yaxis: "y6",
                              type: "scatter",
                              mode: "markers",

                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [1.2, 1.8, 1.7, 1.6, 1.4, 1.5],
                              y: [5, 10, 7, 29, 20, 30],
                              xaxis: "x7",
                              yaxis: "y7",
                              type: "scatter",
                              mode: "markers",

                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [6, 4, 9, 5, 7, 3],
                              y: [1.2, 1.8, 1.7, 1.6, 1.4, 1.5],
                              xaxis: "x9",
                              yaxis: "y9",
                              type: "scatter",
                              mode: "markers",

                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [4, 5, 7, 3, 4, 6, 2],
                              y: [1.2, 1.8, 1.7, 1.6, 1.4, 1.5],
                              xaxis: "x10",
                              yaxis: "y10",
                              type: "scatter",
                              mode: "markers",

                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            },
                            {
                              x: [6, 4, 9, 5, 7, 3],
                              y: [4, 5, 7, 3, 4, 6, 2],
                              xaxis: "x13",
                              yaxis: "y13",
                              type: "scatter",
                              mode: "markers",

                              marker: {
                                size: 12,
                                symbol: ["diamond-open"] //,"diamond-open","line-ew","line-ew","diamond-open","line-ew"]]}
                              }
                            }
                          ]}
                          layout={{
                            font: { size: 16 },
                            xref: "container",
                            x: 70,
                            grid: {
                              rows: 4,
                              columns: 4,
                              pattern: "independent",
                              xside: "top",
                              yside: "left",
                              xgap: 0.1,
                              ygap: 0.1
                              //subplots: [['xy'], ['x2y2'], ['x3y3']]
                              //yaxes: ["x1", "x5", "x9", "x13"],
                              //xaxes: ["y1", "y5", "y9", "y13"]
                            },
                            showlegend: false,
                            //shared_xaxes: true,
                            title: {
                              //text: "Feature Interaction",
                              font: { size: { font: 20 } }
                              //yref:
                            },
                            height: "800",
                            width: "800",
                            xaxis: {
                              title: { text: "Bank" },
                              //rangemode: "tozero",
                              range: [1, 10]
                            },
                            xaxis5: {
                              //title: { text: "Bank" },
                              //rangemode: "tozero",
                              range: [1, 10]
                            },
                            xaxis9: {
                              //title: { text: "Bank" },
                              //rangemode: "tozero",
                              range: [1, 10]
                            },
                            xaxis13: {
                              // title: { text: "Bank" },
                              //rangemode: "tozero",
                              range: [1, 10]
                            },
                            xaxis2: {
                              title: { text: "Industry" },
                              rangemode: "tozero",
                              range: [1, 10]
                            },
                            xaxis6: {
                              //title: { text: "Industry" },
                              rangemode: "tozero",
                              range: [1, 10]
                            },
                            xaxis10: {
                              //title: { text: "Industry" },
                              rangemode: "tozero",
                              range: [1, 10]
                            },

                            xaxis3: {
                              title: { text: "Amount" },
                              rangemode: "tozero",
                              range: [1, 2]
                            },
                            xaxis7: {
                              // title: { text: "Amount" },
                              rangemode: "tozero",
                              range: [1, 2]
                            },

                            xaxis4: {
                              title: { text: "Date" },
                              //rangemode: "tozero",
                              range: [1, 31]
                            },
                            yaxis: {
                              //position: 0.05,
                              //overlaying: "y",
                              title: { text: "Text" },
                              //rangemode: "tozero",
                              range: [1, 2]
                            },
                            yaxis2: {
                              //position: 0.05,
                              //overlaying: "y",
                              // title: { text: "Text" },
                              // rangemode: "tozero",
                              range: [1, 2]
                            },
                            yaxis3: {
                              //position: 0.05,
                              //overlaying: "y",
                              //title: { text: "Text" },
                              // rangemode: "tozero",
                              range: [1, 2]
                            },
                            yaxis4: {
                              //position: 0.05,
                              //overlaying: "y",
                              // title: { text: "Text" },
                              //rangemode: "tozero",
                              range: [1, 2]
                            },
                            yaxis5: {
                              //autoshift: true,
                              title: { text: "Date" },
                              // rangemode: "tozero",
                              range: [1, 31]
                            },
                            yaxis6: {
                              //autoshift: true,
                              //title: { text: "Bank" },
                              //rangemode: "tozero",
                              range: [1, 31]
                            },
                            yaxis7: {
                              //autoshift: true,
                              // title: { text: "Bank" },
                              //rangemode: "tozero",
                              range: [1, 31]
                            },

                            yaxis9: {
                              title: { text: "Amount" },
                              //rangemode: "tozero",
                              range: [1, 2]
                            },
                            yaxis10: {
                              //title: { text: "Industry" },
                              //rangemode: "tozero",
                              range: [1, 2]
                            },
                            yaxis13: {
                              title: { text: "Industry" },
                              // rangemode: "tozero",
                              range: [1, 10]
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1
                  }}
                  open={openBack}
                  onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <MobileStepper
                  variant="text"
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={() => {
                        handleNext(), backDrop();
                      }}
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
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}
