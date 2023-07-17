import { useState } from "react";
import { 
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

const registerSchema = yup.object().shape({
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
});

const initialValuesRegister = {
    username: '',
    email: '',
    password: '',
};

const initialValuesLogin = {
    email: '',
    password: '',
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 1000px");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    

    const register = async (values, onSubmitProps) => {

        const savedUserResponse = await fetch(
            "http://localhost:8000/register",
            {
                method: "POST",
                body: JSON.stringify(values),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();


        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
            "http://localhost:8000/login",
            {
                method: "POST",
                body: JSON.stringify(values),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );

        const loggedIn = await savedUserResponse.json();

        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user.username,
                    token:loggedIn.token,
                })
            );
        navigate(`/crypto-by-user/${loggedIn.user.username}`)
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps)
        if (isRegister) await register(values, onSubmitProps)
    }

    return (
        <Formik
            onSubmit = {handleFormSubmit}
            initialValues = {isLogin? initialValuesLogin : initialValuesRegister}
            validationSchema = {isLogin? loginSchema: registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
            }) =>(
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns= "repeat(4, minmax(0, 1fr))"
                        sx ={{
                            "& > div":{ gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField 
                                    label = "User Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value = {values.username}
                                    name = "username"
                                    id="username"
                                    error = {Boolean(touched.username) && Boolean(errors.username)}
                                    helperText = {touched.username && errors.username}
                                    sx={{
                                        gridColumn: "span 4"
                                    }}
                                />
                            </>
                        )}
                        <TextField 
                            label = "Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value = {values.email}
                            name = "email"
                            id = "email"
                            error = {Boolean(touched.email) && Boolean(errors.email)}
                            helperText = {touched.email && errors.email}
                            sx={{
                                gridColumn: "span 4"
                            }}
                        />
                        <TextField 
                            label = "Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value = {values.password}
                            name = "password"
                            id = "password"
                            error = {Boolean(touched.password) && Boolean(errors.password)}
                            helperText = {touched.password && errors.password}
                            sx={{
                                gridColumn: "span 4"
                            }}
                        />
                    </Box>
                    {/* Buttons */}
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx = {{
                            m:"2rem 0",
                            p:"1rem",
                            backgroundColor: palette.primary.main,
                            color:palette.background.alt,
                            "&:hover": {color: palette.primary.main}
                        }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light
                                },
                            }}
                        >
                            {isLogin 
                            ? "Don't have an account? Sign Up here." 
                            : "Already have an account? Log in here"}
                        </Typography>
                    </Box>
                </form>
            )}

        </Formik>
    )
}

export default Form;