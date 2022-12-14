import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { EducationalInterface } from "../models/IEducational";
import { FacultiesInterface } from "../models/IFaculty";
import { OfficersInterface } from "../models/IOfficer";
import { PrefixInterface } from "../models/IPrefix";
import { TeachersInterface } from "../models/ITeacher";


import {
  GetOfficerByUID,
  GetEducational,
  GetFaculty,
  GetPrefix,
  CreateTeacher,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Teacher_Create() {
  const [Tname, setTeacherName] = useState<String>("");
  const [Temail, setTeacherEmail] = useState<string>("");
  const [Tpass, setTeacherPassword] = useState<string>("");
  const [Teacher, setTeacher] = useState<TeachersInterface>({});
  const [Faculty, setFaculty] = useState<FacultiesInterface[]>([]);
  const [Officer, setOfficer] = useState<OfficersInterface[]>([]);
  const [Prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [Educational, setEducational] = useState<EducationalInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Teacher;
    const value = event.target.value;
    setTeacher({
      ...Teacher,
      [name]: value,
    });
    console.log(`${name}: ${value}`);
  };
  const getOfficer = async () => {
    let res = await GetOfficerByUID();
    if (res) {
      setOfficer(res);
      Teacher.Officer_ID = res.ID
      console.log(res);
    }
  };

  const getFaculty = async () => {
    let res = await GetFaculty();
    if (res) {
      setFaculty(res);
      console.log(res);
    }
  };
  const getPrefix = async () => {
    let res = await GetPrefix();
    if (res) {
      setPrefix(res);
      console.log(res);
    }
  };
  const getEducational = async () => {
    let res = await GetEducational();
    if (res) {
      setEducational(res);
      console.log(res);
    }
  };



  useEffect(() => {
    getOfficer();
    getFaculty();
    getPrefix();
    getEducational();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {

    let data = {
      Name: String(Tname),
      Email: String(Temail),
      Password: String(Tpass),
      OfficerID: convertType(Teacher.Officer_ID),
      FacultyID: convertType(Teacher.Faculty_ID),
      PrefixID: convertType(Teacher.Prefix_ID),
      EducationalID: convertType(Teacher.Educational_ID),
    };
    console.log(data);
    let res = await CreateTeacher(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <Container maxWidth="md">
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            ??????????????????????????????????????????????????????
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ???????????????????????????????????????????????????????????????
          </Alert>
        </Snackbar>
        <Paper>
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                ??????????????????????????????????????????????????????
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>???????????????????????????</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={Teacher.Faculty_ID + ""}
                    onChange={handleChange}
                    inputProps={{
                      name: "Faculty_ID",
                    }}
                  >
                    <option aria-label="None" value="">
                      ?????????????????????????????????????????????????????????
                    </option>
                    {Faculty.map((item: FacultiesInterface) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>?????????????????????????????????????????????????????????</p>
                <Select
                  native
                  value={Teacher.Educational_ID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "Educational_ID",
                  }}
                >
                  <option aria-label="None" value="">
                    ???????????????????????????????????????????????????????????????????????????????????????
                  </option>
                  {Educational.map((item: EducationalInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>???????????????????????????????????????????????????</p>
                <Select
                  native
                  value={Teacher.Prefix_ID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "Prefix_ID",
                  }}
                >
                  <option aria-label="None" value="">
                    ?????????????????????????????????????????????????????????????????????????????????
                  </option>
                  {Prefix.map((item: PrefixInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <p>????????????</p>
              <TextField fullWidth id="Name" type="string" variant="outlined" onChange={(event) => setTeacherName(event.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <p>EMAIL</p>
              <TextField fullWidth id="Email" type="string" variant="outlined" onChange={(event) => setTeacherEmail(event.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <p>Password</p>
              <TextField fullWidth id="Password" type="string" variant="outlined" onChange={(event) => setTeacherPassword(event.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button component={RouterLink} to="/teachers" variant="contained" sx={{ float: "left" }} onClick={submit} >????????????</Button>
              <Button variant="contained" sx={{ float: "right" }} onClick={submit} >?????????????????????????????????????????????????????????</Button>
            </Grid>
          </Grid>
        </Paper>

      </Container>
    </div>
  );
}

export default Teacher_Create;
