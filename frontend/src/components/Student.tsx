import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StudentInterface } from "../models/IStudent";
import { GetStudents } from "../services/HttpClientService";

function Student() {
    const [students, setStudents] = React.useState<StudentInterface[]>([]);

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
            let res = await GetStudents();
        if (res) {
            setStudents(res);
            console.log(res);
        }
    };

    const columns: GridColDef[] = [
        {field: "ID", headerName: "ลำดับ", width: 50  },
        {field: "S_ID", headerName: "รหัสนักศึกษา", width: 100 },
        {field: "Name", headerName: "ชื่อนามสกุล", width: 150 },
        {field: "Collegeyear", headerName: "ชั้นปี", width: 100 ,valueFormatter: (params) => params.value.Name, },
        {field: "Faculty", headerName: "สำนักวิชา", width: 150 ,valueFormatter: (params) => params.value.Name,},
        {field: "Teacher", headerName: "อาจารย์ผู้สอน", width: 150 ,valueFormatter: (params) => params.value.Name,},
        {field: "Date_of_birth", headerName: "วันเดือนปีเกิด", width: 150 },
        {field: "Phone", headerName: "เบอร์โทร", width: 150 },
        {field: "Parent", headerName: "ผู้ปกครอง", width: 150 },
        {field: "Officer", headerName: "ผู้บันทึก", width: 100 ,valueFormatter: (params) => params.value.Name, },
    ];
    return (
        <div>
            <Container maxWidth="md">
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box flexGrow={1}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            ข้อมูลนักศึกษา
                        </Typography>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/student/create" variant="contained" color="primary">
                            สร้างข้อมูลนักศึกษา
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid
                        rows={students}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Student;