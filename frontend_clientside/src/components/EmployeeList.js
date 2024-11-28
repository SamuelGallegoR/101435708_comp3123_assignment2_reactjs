import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees(); // Fetch all employees initially
    }, []);

    const fetchEmployees = async (query = '') => {
        try {
            const response = await axios.get(`/api/v1/emp/employees?q=${query}`);
            setEmployees(response.data); 
        } catch (err) {
            console.error('Error fetching employees:', err.message);
            alert('Error fetching employees');
        }
    };
    

    const handleSearch = (query) => {
        fetchEmployees(query);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Employee List</h1>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/employees/add" className="btn btn-primary">
                    Add Employee
                </Link>
                <div style={{ width: '50%' }}>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
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
