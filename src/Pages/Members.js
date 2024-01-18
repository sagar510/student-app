import '../App.css';
import { useState,useEffect } from 'react';
import { getToken } from '../auth';
import Base from '../Components/Base';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';

function  Members() {

    const [data,setdata] = useState({});
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(7);// Fixed rows per page

    //const [studata,setstudata] = useState([]);

    useEffect(   () => {
        fetch(
            `http://127.0.0.1:3000/viewmember`,{
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

    const studata = data.student || []
    const admindata = data.admin || []
    const tchrdata = data.teacher || []

    //const Eachstutablerow = [];
    const Eachstutablerow = studata
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item) => (
        <TableRow key={item.id}>
            <TableCell>{item.student_name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.admin_name}</TableCell>
        </TableRow>
    ));


    const Eachadmintablerow = [];
    admindata.forEach((item) => {
        Eachadmintablerow.push(
            <tr key={item.id}>
            <td>{item.admin_name}</td>
            <td>{item.email}</td>
            </tr>
        );
    });

    const Eachtchrtablerow = tchrdata
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((item) => (
        <TableRow key={item.id}>
            <TableCell>{item.teacher_name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.admin_name}</TableCell>
        </TableRow>
    ));

    if(studata)
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
                
                <TablePagination
                component="div"
                count={studata.length} // Total number of students
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} // Function to handle page changes
                />
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
                count={studata.length} // Total number of students
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
                count={studata.length} // Total number of students
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} // Function to handle page changes
                />
            </div>
            </Base>
        );
        
    return <h1>Null Data</h1>

}

export default Members;
