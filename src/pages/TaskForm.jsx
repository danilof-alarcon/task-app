import './styles/Form.css'
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';
import AlertMessage from "../components/AlertMessage";

function TaskForm() {

    // Auth

    const { auth, createTaskRequest } = useData()
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    if (!auth) {
        return null;
    }

    // Code

    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        title: '',
        description: '',
    };

    const handleSubmitCreate = async (values, actions) => {
        const { title, description } = values;
        setIsSubmitting(true)
        try {
            await createTaskRequest(title, description)
            setShowAlert(true)

            actions.resetForm();
            setIsSubmitting(false)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <h1>Task Form Page</h1>

            <Formik 
                initialValues={initialValues}
                onSubmit={handleSubmitCreate}>
                <Form className='form-container'>
                    <div className='input-container'>
                        <label>Title</label>
                        <Field type='text' name='title' id="title" required className="input"/>
                    </div>
                    <div className='input-container'>
                        <label>Description</label>
                        <Field type='text' name='description' id="description" className="input"/>
                    </div>
                    <button type="submit" disabled={isSubmitting} className='form-button'>
                        {isSubmitting ? 'Creating...' : 'Create Task'}
                    </button>
                </Form>
            </Formik>

            {showAlert && <AlertMessage message={"Task Created"} type={"correct"}/>}
            <a href="/dashboard">Back Home</a>
        </div>
    )
}

export default TaskForm