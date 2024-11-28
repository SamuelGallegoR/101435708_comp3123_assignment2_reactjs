import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await axios.get('/api/v1/emp/employees');
            setEmployees(response.data);
        };
        fetchEmployees();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Employee List</h1>
            <Link to="/employees/add" className="btn btn-primary mb-3">Add Employee</Link>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.first_name} {employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.position}</td>
                            <td>
                                <Link to={`/employees/${employee._id}`} className="btn btn-info btn-sm me-2">View</Link>
                                <Link to={`/employees/${employee._id}/edit`} className="btn btn-warning btn-sm">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
