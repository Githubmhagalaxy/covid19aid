import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {MUTATION_SIGNUP} from "../../utils/mutations";
import Auth from '../../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState('');
    const [signup] = useMutation(MUTATION_SIGNUP);
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        // check if password length is less than 6 show error
        if(formState.password.length < 6) {
            setError('Password length must be greater than 5');
            return;
        }
    
        const mutationResponse = await signup({
            variables: {
                name: formState.name,
                email: formState.email,
                password: formState.password
            }
        });
        const token = mutationResponse.data.signup.token;
        Auth.login(token);
    }
    
    return (
        <>
            <section className="signup">
                <div className="container">
                    <h2 className="title">Sign Up</h2>
                    <p>Already have an account? <Link to={'/login'}>Login</Link></p>
                    <div className="error">{error}</div>
                    <form method={'post'} className={'sign-up-form'} onSubmit={handleSubmit}>
                        <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} placeholder={'Name:'}/>
                        <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} placeholder={'Email:'} />
                        <input type="password" name="password" id="password" value={formState.password} onChange={handleChange} placeholder={'Password:'} />
                        <div className="submit-sec">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Signup;