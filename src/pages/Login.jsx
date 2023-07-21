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
        <div className='page-container'>
            <div className="auth-container">
                <h1>Welcome Back!</h1>
                <p>We are happy to see you again</p>

                <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}>
                    <Form className='form-container'>
                        <Field type='email' name='email' id="email" required className="input" placeholder="Email" />
                        <Field type='password' name='password' id="password" required className="input" placeholder="Password" />
                        <button type="submit" disabled={isSubmitting} className='form-button'>
                            {isSubmitting ? 'Wait...' : 'Log In'}
                        </button>
                        {showAlert && <AlertMessage message={"Incorrect User or Password"} type={"error"}/>}
                    </Form>
                </Formik>

                <p className='redirecter'>Don’t have an account yet? <a href="/register">Sign Up</a></p>
            </div>
        </div>
    )
}

export default LoginPage