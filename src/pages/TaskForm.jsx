import './styles/Form.css'
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';

function TaskForm() {

    // Auth

    const { auth, createTaskRequest, loadOneTaskRequest, oneTaskData, updateTaskRequest } = useData()
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

    const { id: taskId } = useParams();
    const [isLoading, setIsLoading] = useState(Boolean(taskId));
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(taskId) {
            const fetchData = async() => {
                await loadOneTaskRequest(taskId);
                setIsLoading(false);
            }

            fetchData();
        }
    }, [])

    const initialValues = {
        title: taskId ? oneTaskData.title || "" : "",
        description: taskId ? oneTaskData.description || "" : ""
    };

    const handleSubmitCreate = async (values) => {
        const { title, description } = values;
        setIsSubmitting(true)
        try {
            await createTaskRequest(title, description)
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitEdit = async (values) => {
        const { title, description } = values;
        setIsSubmitting(true)
        try {
            await updateTaskRequest(taskId, title, description)
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <div className='page-container'>
            <div className='auth-container'>
                <h1>{taskId ? "Edit Task" : "Create Task"}</h1>

                {isLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <Formik 
                        initialValues={initialValues}
                        onSubmit={taskId ? handleSubmitEdit : handleSubmitCreate}>
                        <Form className='form-container'>
                            <Field type='text' name='title' id="title" required className="input" placeholder="Task Title" />
                            <Field type='textarea' as="textarea" rows="4" name='description' id="description" className="input" placeholder="Task Description" />
                            <button type="submit" disabled={isSubmitting} className='form-button'>
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </Form>
                    </Formik>
                )}

                <a href="/dashboard">Back to Home</a>
            </div>
        </div>
    )
}

export default TaskForm