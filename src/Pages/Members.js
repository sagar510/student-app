import '../App.css';
import { useState,useEffect } from 'react';
import { getToken } from '../auth';
import Base from '../Components/Base';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';

function  Members() {

    const [data,setdata] = useState([]);
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(7);// Fixed rows per page
    //const rowsPerPage =7

    //const [studata,setstudata] = useState([]);
    const baseUrl = process.env.REACT_APP_API_URL;

    useEffect(   () => {
        fetch(
            `${baseUrl}/viewmember`,{
                method: "GET",
                headers: {
                    "Authorization":`Bearer ${getToken()}`
                }
            }
        )
        .then(
            (response) => response.json()
        )
        .then(setdata)
    },[]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage); // Update the current page when the user changes it
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const commonData = data || [] 
    const admindata = data.admin || []
    const tchrdata = data.teacher || []

    //const Eachstutablerow = [];
    const Eachstutablerow = commonData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item) => ( 
        (item.role === 'student') ?
            <TableRow key={item.id}>
                <TableCell>{item.student && item.student.student_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.student && item.student.admin && item.student.admin.admin_name}</TableCell>
            </TableRow>
        :null
    ));


    const Eachadmintablerow = commonData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item) => ( 
        (item.role === 'admin') ?
            <TableRow key={item.id}>
                <TableCell>{item.admin && item.admin.admin_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.admin && item.admin.admin && item.admin.admin.admin_name}</TableCell>
            </TableRow>
        :null
    ));

    console.log("admins"+Eachadmintablerow);

    const Eachtchrtablerow = commonData
    .map((item) => ( 
        (item.role === 'teacher') ?
            <TableRow key={item.id}>
                <TableCell>{item.teacher && item.teacher.teacher_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.teacher && item.teacher.admin && item.teacher.admin.admin_name}</TableCell>
            </TableRow>
        :null
    ));

    return (
        <Base>
        
        <div>
            <h2>All Students</h2>
            
                <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><h3>Student Name</h3></TableCell>
                        <TableCell><h3>Email</h3></TableCell>
                        <TableCell><h3>Created By</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{Eachstutablerow}</TableBody>
                </Table>
                </TableContainer>
            
            { <TablePagination
            rowsPerPageOptions={[7, 14, 21]}
            component="div"
            count={commonData.length} // Total number of students
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage} // Function to handle page changes
            onRowsPerPageChange={handleChangeRowsPerPage}
    />}
        </div>
        <div>
            <h2>All Teachers</h2>
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><h3>Teacher Name</h3></TableCell>
                        <TableCell><h3>Email</h3></TableCell>
                        <TableCell><h3>Created By</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{Eachtchrtablerow}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            component="div"
            count={commonData.length} // Total number of students
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage} // Function to handle page changes
            />
        </div>
        <div className="App">
            <h1>All Admins</h1>
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><h3>Admin Name</h3></TableCell>
                        <TableCell><h3>Email</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{Eachadmintablerow}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            component="div"
            count={commonData.length} // Total number of students
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage} // Function to handle page changes
            />
        </div>
        </Base>
    );

}

export default Members;
