// Import necessary modules
"use client";
import Link from 'next/link';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/registerdesign.css';
import Navbar from '../components/Navbar';

// Create the RegisterForm component
const RegisterForm: React.FC = () => {
    // State variables for form inputs and additional state variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [missingFields, setMissingFields] = useState(false);
    // Function to handle registration
    const handleRegister = async () => {
        // Check for missing fields
        if (!username || !email || !password || !password2) {
            setMissingFields(true);
            return;
        } else {
            setMissingFields(false);
        }

        try {
            // Check if passwords match and meet the criteria
            if (password !== password2 || password.length < 6) {
                setPasswordMatch(false);
                setPasswordError('Passwords must match and be at least 6 characters long.');
                return;
            } else {
                setPasswordMatch(true);
                setPasswordError('');
            }

            // Check if username and email already exist
            const usernameCheck = await checkExisting('username', username);
            const emailCheck = await checkExisting('email', email);

            if (usernameCheck || emailCheck) {
                setUsernameExists(usernameCheck);
                setEmailExists(emailCheck);
                return;
            } else {
                setUsernameExists(false);
                setEmailExists(false);
            }

            // Assuming your registration API endpoint is 'http://localhost:3001/users'
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                // If registration is successful, redirect to the login page
                window.location.href = '/login'; // Using window.location.href for a full-page reload
            } else {
                // Handle registration failure
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    // Function to check if username or email already exists
    const checkExisting = async (field: string, value: string): Promise<boolean> => {
        try {
            const response = await fetch(`http://localhost:3001/users?${field}=${value}`);
            const data = await response.json();
            return data.length > 0;
        } catch (error) {
            console.error(`Error checking existing ${field}:`, error);
            return false;
        }
    };

    // Return the JSX for the component
    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 border p-4 rounded">
                        <h1 className="text-center mb-4">Register</h1>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label"><b>Username:</b></label>
                            <input type="text" placeholder='Username' className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {usernameExists && <p className="text-danger">Username already exists.</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><b>Email:</b></label>
                            <input type="text" className="form-control" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            {emailExists && <p className="text-danger">Email already exists.</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><b>Password:</b></label>
                            <input type="password" placeholder='Password' className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label"><b>Confirm Password:</b></label>
                            <input type="password" className="form-control" placeholder='Confirm Password' id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        </div>
                        {!passwordMatch && <p className="text-danger">{passwordError}</p>}
                        {missingFields && <p className="text-danger">Please fill in all fields.</p>}
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={handleRegister}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className="mt-3">
                        Already have an account?{' '}
                        <Link style={{ color: 'red',textDecoration:'none' }} href="/login">
                            Login here
                        </Link>
                    </p>
                </div>
            </div></>
    );
};

export default RegisterForm;
