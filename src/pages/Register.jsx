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
        <div className="log-reg-container">
            <h1>Register Page</h1>

            <Formik 
                initialValues={initialValues}
                onSubmit={handleSubmit}>
                <Form className='form-container'>
                    <div className='input-container'>
                        <label>Name</label>
                        <Field type='text' name='name' id="name" required className="input"/>
                    </div>
                    <div className='input-container'>
                        <label>Email</label>
                        <Field type='email' name='email' id="email" required className="input"/>
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <Field type='password' name='password' id="password" minLength={8} required className="input"/>
                    </div>
                    <button type="submit" disabled={isSubmitting} className='log-reg-button'>
                        {isSubmitting ? 'Creating User...' : 'Register'}
                    </button>
                </Form>
            </Formik>

            {showAlert && <AlertMessage message={"User Already Exist"} type={"error"}/>}
            <p className='redirecter'>Already a member?  <a href="/">Log In</a></p>
        </div>
    )
}

export default RegisterPage