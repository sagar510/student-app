import './App.css';
import { useState,useEffect } from 'react';

function AllTeachers() {

    const [stu_data,set_stu_data] = useState([]);
    const baseUrl = process.env.REACT_APP_API_URL;

    useEffect(   () => {
        fetch(
            `http://127.0.0.1:3000/thnkgoods.json`
        )
        .then((response) => response.json())
        .then(set_stu_data)
    },[stu_data.length]);

    const Eachtablerow = stu_data.map( (item) => {
        return (
            <tr key={item.id}>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.twitter}</td>
            </tr>
        );
    });

    if(stu_data)
        return (
            <div className="App">
                <h1>All Students</h1>
                <table>
                    <thead>
                        <tr>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th>Twitter </th>
                        </tr>
                    </thead>
                    <tbody>{Eachtablerow}</tbody>
                </table>
            </div>
        );
        
    return <h1>Null Data</h1>

}

export default AllTeachers;
