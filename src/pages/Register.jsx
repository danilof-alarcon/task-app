import './styles/Form.css'
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';
import AlertMessage from "../components/AlertMessage";


function RegisterPage() {

    // Auth

    const { auth, RegisterRequest } = useData()
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

    const handleSubmit = async (values) => {
        const { name, email, password } = values;
        setIsSubmitting(true)
        try {
            const response = await RegisterRequest(name, email, password)
            console.log(response);
            window.location.reload()
        } catch (error) {
            setShowAlert(true)
            setIsSubmitting(false)  
        }
    }

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    return(
        <div className='page-container'>
            <div className="auth-container">
                <h1>Join Now!</h1>
                <p>Ready to join the game? Register Now!</p>

                <Formik 
                    initialValues={initialValues}
                    onSubmit={handleSubmit}>
                    <Form className='form-container'>
                        <Field type='text' name='name' id="name" required className="input" placeholder="Name" />
                        <Field type='email' name='email' id="email" required className="input" placeholder="Email" />
                        <Field type='password' name='password' id="password" minLength={8} required className="input" placeholder="Password" />
                        <button type="submit" disabled={isSubmitting} className='form-button'>
                            {isSubmitting ? 'Creating User...' : 'Register'}
                        </button>
                        {showAlert && <AlertMessage message={"User already exists."} type={"error"}/>}
                    </Form>
                </Formik>

                <p className='redirecter'>Already a member?  <a href="/">Log In</a></p>
            </div>
        </div>
    )
}

export default RegisterPage