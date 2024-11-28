import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar'; // Assuming you have a separate SearchBar component
import { Link } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Track the search query

    // Function to fetch employees
    const fetchEmployees = async (query = '') => {
        try {
            const response = await axios.get(`/api/v1/emp/employees${query ? `?q=${query}` : ''}`);
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees', err);
        }
    };

    // Fetch all employees initially
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query); // Update the search query state
        if (query.trim() === '') {
            fetchEmployees(); // Fetch all employees if the search query is empty
        } else {
            fetchEmployees(query);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Employee List</h1>
            <div className="row mb-3">
                <div className="col-md-6 d-flex align-items-center">
                    <Link to="/employees/add" className="btn btn-primary">Add Employee</Link>
                </div>
                <div className="col-md-6">
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
