export default function Settings() {
    return (
        <div className={`w-screen flex justify-center items-center`}>
            <p>This is where you can customize your preferences.</p>
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
                <label>Username:</label>
                <input type="text" placeholder="Change username" />
                <button>Update Username</button>
            </div>
            
            
            <div>
                Forgot Password? Click here to reset
            </div>
        </div>
    )
}