//Bill ของเพื่อน
import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { useEffect } from "react";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
//เพิ่ม
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//เพิ่ม

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { BillsInterface } from "../models/IBill";
import { PaymentsInterface } from "../models/IPayment";
import { OfficersInterface } from "../models/IOfficer";
 //เพิ่ม
import { StudentInterface } from "../models/IStudent";
import { SubjectsInterface } from "../models/ISubject";


import { SelectChangeEvent } from "@mui/material";
import moment from 'moment';


import{GetOfficerByUID,
        Bills,
    GetPayments,
    GetSubjects,
    GetStudents}from "../services/HttpClientService";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function BillCreate() {
  const [bill, setBill] = React.useState<Partial<BillsInterface>>({});
  const [payments, setPayments] = React.useState<PaymentsInterface[]>([]);
//เพิ่ม
  const [datetimepay, setDatetimepay] = React.useState<Date | null>(null);
  const [officer, setOfficers] = React.useState<OfficersInterface>({});
  const [student, setStudents] = React.useState<StudentInterface[]>([]);
 const  [subject, setSubjects] = React.useState<SubjectsInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof BillCreate;

    const { value } = event.target;

    setBill({ ...bill, [id]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as keyof typeof bill;
    setBill({
      ...bill,
      [name]: event.target.value,
    });
  };

  const getPayments = async () => {
    let res = await GetPayments();
    
   console.log(res);
    if (res) {
        setPayments(res);
    }
};
//New
const getStudentID = async () => {
  let res = await GetStudents();
 
  console.log(res);
  if (res) {
      setStudents(res);
  }
};

const getSubjects = async () => {
  let res = await GetSubjects();
  if (res) {
      setSubjects(res);
      console.log(res);
  }
};




  //Funtion get FK payment
   

  // fetch previous income record
 
//New


const getOfficersID = async () => {
  let res = await GetOfficerByUID();
  bill.OfficerID = res.ID;
  console.log(bill.OfficerID);
  if (res) {
      setOfficers(res);
  }
};

useEffect(() => {
  getPayments();
  getOfficersID();
  getSubjects()
  getStudentID();
  
    }, []);



    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val; 
    };



        async function submit() {
          
          let data = {
            StudentID:convertType(bill.StudentID),
            SubjectID: convertType(bill.SubjectID),
            Total: convertType(bill.Total),

            //Combobox
            Payment_ID: (bill.Payment_ID),
            Datetimepay: moment(datetimepay).format("YYYY-MM-DD"),
            
            OfficerID: convertType(bill.OfficerID),
          }
          let res = await Bills(data);
          if (res) {
              setSuccess(true);
          } else {
              setError(true);
          }}
                 
            return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
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
              กรอกข้อมูลการชำระค่าลงทะเบียนเรียน
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Grid container spacing={1} sx={{ padding: 2 }}>

        <Grid item xs={8} >
        <FormControl fullWidth variant="outlined">
            <p>รหัสนักศึกษา</p>

            <Select
                                variant="outlined"
                                id="StudentID"
                                label="รหัสนักศึกษา"
                                value={bill.StudentID+""}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "StudentID",
                                }}

                            >
                                {student.map((item: StudentInterface) => (
                                    <MenuItem
                                        value={item.ID}
                                        key={item.ID}
                                    >
                                        {item.S_ID}
                                    </MenuItem>
                                ))}
                            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} >
          <FormControl fullWidth variant="outlined">
            <p>ข้อมูลการลงทะเบียนเรียน</p>

            <Select
              required
              defaultValue={"0"}
              onChange={handleSelectChange}
              inputProps={{
                name: "SubjectID",
              }}
            >
              <MenuItem value={"0"}>กรุณาเลือกวิชา</MenuItem>
                {subject.map((item: SubjectsInterface) => 
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Code}
                  </MenuItem>
                )}
            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>จำนวนเงินที่ชำระ</p>

            <FormControl fullWidth variant="outlined">
              <TextField
                id="Total"
                label="กรุณาระบุจำนวนเงินที่ชำระ"
                InputProps={{inputProps:{min:0, max:1000000}}} 
                type="number"
                size="medium"
                value={bill.Total || ""}
                onChange={handleInputChange}
                
                
              />
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>ชำระผ่าน</p>

            <FormControl fullWidth variant="outlined">
              
            
            <Select
                                variant="outlined"
                                id="Payment_ID"
                                label="ธนาคารที่ชำระ"
                                value={bill.Payment_ID}
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "Payment_ID",
                                }}

                            >
                                {payments.map((item: PaymentsInterface) => (
                                    <MenuItem
                                        value={item.Payment_ID}
                                        key={item.Payment_ID}
                                    >
                                        {item.Name}
                                    </MenuItem>
                                ))}
                            </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>วันที่ชำระ</p>
            <FormControl fullWidth variant="outlined">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="โปรดระบุวันที่ชำระ"
                    value={datetimepay} //รับมาจากการอัพเดท

                    onChange={(newValue) => {
                      setDatetimepay(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              
             
            </FormControl>
          </Grid>

          <Grid item xs={8} >
            <p>เจ้าหน้าที่การเงิน</p>

            <FormControl fullWidth variant="outlined">
            
            <Select
                                variant="outlined"
                                id="OfficerID"
                                value={officer?.ID+ ""}
                                disabled
                                onChange={handleSelectChange}
                                inputProps={{
                                    name: "OfficerID",
                                }}

                            >
                                <option aria-label="None" value={officer?.ID} key={officer?.ID}>
                                           {officer?.Name}
                                  </option>
                            
                            </Select>
            </FormControl>
          </Grid>
                 

         
          
          <Grid item xs={12}>
            <Button component={RouterLink} to="/bills" variant="contained">
              Back
            </Button>

            <Button
            style={{ float: "right" }} 
                            onClick={submit} 
                            variant="contained" 
                            color="primary">
                            
              ยืนยันการชำระเงิน
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}


export default BillCreate;