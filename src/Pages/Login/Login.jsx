import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { signIn } = useContext(AuthContext);

    const handleSignIn = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log( email, password);

        signIn(email, password)
            .then(result => {
                const userCreate = result.user;
                console.log(userCreate);
                const user = {email}
                axios.post('http://localhost:5000/jwt',user, {withCredentials: true})
                .then(res=>{
                    console.log(res.data);
                    if(res.data.success){
                        navigate(from, {replace: true})
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12">
                    <img src={login} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl pt-3 text-center font-bold">Login</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className='text-center mb-4'>New to this site?<Link to="/signup" className='text-orange-500 font-bold'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;