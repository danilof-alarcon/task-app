import './styles/Form.css'
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';
import AlertMessage from "../components/AlertMessage";

function LoginPage() {

    // Auth

    const { auth, logInRequest } = useData()
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate("/dashboard");
        }
    }, [auth, navigate]);

    if (auth) {
        return null;
    }

    // Code

    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values) => {
        const { email, password } = values;
        setIsSubmitting(true)
        try {
            await logInRequest(email, password)
            window.location.reload()
        } catch (error) {
            setShowAlert(true)
            setIsSubmitting(false)
        }
    }

    return(
        <div className="auth-container">
            <h1>Sign in to your account</h1>

            <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}>
                <Form className='form-container'>
                    <div className='input-container'>
                        <label>Email</label>
                        <Field type='email' name='email' id="email" required className="input"/>
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <Field type='password' name='password' id="password" required className="input"/>
                    </div>
                    <button type="submit" disabled={isSubmitting} className='form-button'>
                        {isSubmitting ? 'Wait...' : 'Log In'}
                    </button>
                </Form>
            </Formik>

            {showAlert && <AlertMessage message={"Incorrect User or Password"} type={"error"}/>}
            <p className='redirecter'>Not a member?  <a href="/register">Register</a></p>
        </div>
    )
}

export default LoginPage