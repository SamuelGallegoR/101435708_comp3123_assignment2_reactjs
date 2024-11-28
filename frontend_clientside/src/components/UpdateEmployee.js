import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateEmployee() {
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/api/v1/emp/employees/${id}`);
                setFormData(response.data);
            } catch (err) {
                alert('Error fetching employee details');
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/v1/emp/employees/${id}`, formData);
            alert('Employee updated successfully');
            navigate('/employees');
        } catch (err) {
            alert('Error updating employee');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`/api/v1/emp/employees/${id}`);
                alert('Employee deleted successfully');
                navigate('/employees');
            } catch (err) {
                alert('Error deleting employee');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Update Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input name="first_name" value={formData.first_name || ''} className="form-control" placeholder="First Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input name="last_name" value={formData.last_name || ''} className="form-control" placeholder="Last Name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" type="email" value={formData.email || ''} className="form-control" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input name="position" value={formData.position || ''} className="form-control" placeholder="Position" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input name="salary" type="number" value={formData.salary || ''} className="form-control" placeholder="Salary" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input name="department" value={formData.department || ''} className="form-control" placeholder="Department" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary me-2">Update</button>
                <button type="button" className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/employees')}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateEmployee;
