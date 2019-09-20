import React from 'react'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup';
import {axiosWithAuth} from "../utils/axiosWithAuth"


 const LoginForm = ({ touched, errors, isSubmitting, values }) => {
    return (
        <Form>
        <div className="input-group">
            <div className="login-group" >
               {touched.name && errors.name && <p>{errors.username}</p>}
               <label htmlFor="username">Username: </label>
                <Field
                    type="text"
                    name="username"
                    placeholder="Username"

                />
            </div>
            <div className="login-group">
            {touched.password && errors.password && <p>{errors.password}</p>}
                <label htmlFor="password">Password: </label>
                <Field
                    type="password"
                    name="password"
                    placeholder="Password"

                />
            </div>
     
        </div>
        <div>
                {isSubmitting && <p>Loading...</p>}
            <button
                disabled={isSubmitting}
                className="submit-button"
                type="submit"
            >
                Submit
            </button>
        </div>
        </Form>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues() {
       return{
        username: "",
        password: ""
       };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min( 3, 'Password must be at least 3 characters').required('Password Required')
    }),

    handleSubmit(values,formikBag){
        const url = "/login"
        return axiosWithAuth().post(url,values).then(res => {
            localStorage.setItem("token", res.data.payload);
            formikBag.props.history.push("/protected")
            formikBag.resetForm()
        })

    },

})(LoginForm);
export default FormikLoginForm;