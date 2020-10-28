import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {MUTATION_LOGIN} from "../../utils/mutations";
import Auth from "../../utils/auth"

const Login = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })
    // const [error, setError] = useState('');
    const [login, {error}] = useMutation(MUTATION_LOGIN);
    const handleChange = e => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <section className="login">
                <div className="container">
                    <h2 className="title">Login</h2>
                    <p>Do not have account? <Link to={'/signup'}>Signup</Link></p>
                    <div className="error">{error}</div>
                    <form method='post' onSubmit={handleSubmit}>
                        <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} placeholder={'Email:'}/>
                        <input type="password" name="password" id="password" value={formState.password} onChange={handleChange} placeholder={'Password:'}/>
                        <div className="submit-sec">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;