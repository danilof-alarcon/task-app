import './styles/Form.css'
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";
import { Formik, Field, Form } from 'formik';
import AlertMessage from "../components/AlertMessage";

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
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState({
        message: "",
        type: "",
    });
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

    const handleSubmitCreate = async (values, actions) => {
        const { title, description } = values;
        setIsSubmitting(true)
        try {
            await createTaskRequest(title, description)
            setShowMessage({
                message: "Task Created",
                type: "correct"
            })
            setShowAlert(true)

            actions.resetForm();
            setIsSubmitting(false)
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
        <div>
            <h1>{taskId ? "Edit Task" : "Create Task"}</h1>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Formik 
                    initialValues={initialValues}
                    onSubmit={taskId ? handleSubmitEdit : handleSubmitCreate}>
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
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </Form>
                </Formik>
            )}


            {showAlert && <AlertMessage message={showMessage.message} type={showMessage.type}/>}
            <a href="/dashboard">Back Home</a>
        </div>
    )
}

export default TaskForm