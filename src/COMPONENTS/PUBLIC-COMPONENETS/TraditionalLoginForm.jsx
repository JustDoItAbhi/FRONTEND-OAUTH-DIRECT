const TraditionalLoginForm = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Login</h2>
      <form 
        action="http://localhost:8080/api/auth/login" 
        method="POST"
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button 
          type="submit"
          style={{ padding: '10px', backgroundColor: '#007bff', color: 'white' }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default TraditionalLoginForm;