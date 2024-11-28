import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CurrentUser() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            navigate('/'); 
        }
    }, [navigate]);

    const handleBack = () => {
        navigate('/employees'); // Navigate back to Employee List
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            navigate('/'); // Redirect to Login
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">User Profile</h3>
                    {userInfo.username && userInfo.email ? (
                        <div className="text-center">
                            <p><strong>Username:</strong> {userInfo.username}</p>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                        </div>
                    ) : (
                        <p className="text-danger text-center">No user information available. Please log in again.</p>
                    )}
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-secondary" onClick={handleBack}>
                            Back to Employee List
                        </button>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentUser;

