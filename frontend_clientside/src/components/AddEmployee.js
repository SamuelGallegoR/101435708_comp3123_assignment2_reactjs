import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        department: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/emp/employees', formData);
            navigate('/employees');
        } catch (err) {
            alert('Error adding employee');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input name="first_name" className="form-control" placeholder="First Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input name="last_name" className="form-control" placeholder="Last Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input name="position" className="form-control" placeholder="Position" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input name="salary" type="number" className="form-control" placeholder="Salary" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input name="department" className="form-control" placeholder="Department" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary me-2">Add</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/employees')}>Cancel</button>
            </form>
        </div>
    );
}

export default AddEmployee;
