import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/api/v1/emp/employees/${id}`);
                setEmployee(response.data);
            } catch (err) {
                alert('Error fetching employee details');
            }
        };
        fetchEmployee();
    }, [id]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Employee Details</h1>
            {employee ? (
                <div>
                    <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Position:</strong> {employee.position}</p>
                    <p><strong>Department:</strong> {employee.department}</p>
                    <p><strong>Salary:</strong> ${employee.salary}</p>
                    <div className="mt-4">
                        <button
                            className="btn btn-primary me-2"
                            onClick={() => navigate(`/employees/${id}/edit`)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/employees')}
                        >
                            Back
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EmployeeDetails;
