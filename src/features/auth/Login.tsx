const Login = () => {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="p-6 rounded-xl shadow-md w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
            />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  