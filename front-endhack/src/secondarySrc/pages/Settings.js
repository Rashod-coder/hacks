import { sendPasswordResetEmail } from 'firebase/auth';
import '../../Settings.css'; // Import the CSS file
import { useState } from 'react';
import { auth } from '../../auth/Authentication';

function Settings() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [resetError, setResetError] = useState(null);
    const [resetSuccess, setResetSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setResetSuccess('Check your email for password reset instructions.');
        } catch (error) {
            setResetError(error.message);
        }
    };

    const handleUpdateUsername = () => {
        // Implement your logic for updating the username here
    };

    return (
        <div className="settings-container ">
            <div className='form-container'>
                <h1>Settings</h1>
                <p className="text-black mb-4">This is where you can customize your preferences.</p>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" placeholder="Change your username" />
                    <button>Update Name</button>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" placeholder="Change your email" />
                    <button>Update Email</button>
                </div>
                <div className="form-group">
                    <label>Enter Email:</label>
                    <input 
                        type="text" 
                        placeholder="Change email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <button onClick={handleUpdateUsername}>Update Email</button>
                </div>
                <button onClick={handleSubmit}>Reset Password</button>
            </div>
            <div>
                Forgot Password? Click here to reset
            </div>
        </div>
    );
}

export default Settings;
