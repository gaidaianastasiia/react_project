import React, {Component} from 'react';
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import Loader from "../../common/loader/Loader";
import {Link, Redirect} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import ValidationService from "../../../services/ValidationService";
import {AUTH_SERVER_ERR_MESSAGES, INTERNAL_SERVER_ERROR} from "../../../constants/apiErrMessages";

export default class AuthSignup extends Component {
    constructor() {
        super();
        this.authService = new AuthService();
        this.validationService = new ValidationService();
    }

    state = {
        user: {
            email: "",
            password: "",
            confPassword: ""
        },
        emailErrMessage: "",
        passErrMessage: "",
        confPassErrMessage: "",
        serverErrMessage: "",
        showLoader: false,
        isRedirect: false
    }

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    handleSubmit = () => {
        this.clearErrMessages();

        const {email, password, confPassword} = this.state.user;
        const emailValidData = this.validationService.validateEmail(email);
        const passwordValidData = this.validationService.validatePassword(password);
        const passwordsValidData = this.validationService.validatePasswordsMatch(password, confPassword);

        if (emailValidData.isValid && passwordValidData.isValid && passwordsValidData.isValid) {
            this.signup({email, password})
        } else {
            this.setState({
                ...this.state,
                emailErrMessage: emailValidData.errMessage,
                passErrMessage: passwordValidData.errMessage,
                confPassErrMessage: passwordsValidData.errMessage
            });
        }
    }

    clearErrMessages = () => {
        this.setState({
            ...this.state,
            emailErrMessage: "",
            passErrMessage: "",
            confPassErrMessage: "",
            serverErrMessage: "",
            showLoader: true
        });
    }

    signup = newUser => {
        this.authService.signup(newUser)
            .then(() => {
                    this.setLoaderState(false);
                    this.setRedirectState(true);
                }
            )
            .catch(err => {
                this.setLoaderState(false);
                this.showServerErrMessage(err);
            });
    }

    setLoaderState = state => {
        this.setState({
            ...this.state,
            showLoader: state
        });
    }

    setRedirectState = state => {
        this.setState({
            ...this.state,
            isRedirect: state
        });
    }

    showServerErrMessage = err => {
        switch (err) {
            case 500:
                this.setServerErrMessage(INTERNAL_SERVER_ERROR);
                break;
            case 600:
                this.setServerErrMessage(AUTH_SERVER_ERR_MESSAGES.USER_EXIST);
                break;
            default:
        }
    }

    setServerErrMessage = errMessage => {
        this.setState({
            ...this.state,
            serverErrMessage: errMessage
        });
    }

    render() {
        const {email, password, confPassword} = this.state.user;
        const {
            emailErrMessage,
            passErrMessage,
            confPassErrMessage,
            serverErrMessage,
            showLoader,
            isRedirect
        } = this.state;

        return (
            <section className="auth">
                <form action="#" className="auth__form">
                    <h2 className="auth__title">Sign up</h2>
                    <p className="auth__server-err-message">{serverErrMessage}</p>
                    <Input
                        type={"email"}
                        name={"email"}
                        value={email}
                        onChange={this.handleInputChange}
                        labelText={"Email"}
                        errorMessage={emailErrMessage}
                    />
                    <Input
                        type={"password"}
                        name={"password"}
                        value={password}
                        onChange={this.handleInputChange}
                        labelText={"Password"}
                        errorMessage={passErrMessage}
                    />
                    <Input
                        type={"password"}
                        name={"confPassword"}
                        value={confPassword}
                        onChange={this.handleInputChange}
                        labelText={"Enter your password again for verification"}
                        errorMessage={confPassErrMessage}
                    />
                    <Button onClick={this.handleSubmit}>Signup</Button>
                </form>
                <div className="auth__link">
                    <Link to="/signin">Already have an account? Sign In.</Link>
                </div>
                {showLoader && <Loader/>}
                {isRedirect && <Redirect to={{pathname: '/news'}}/>}
            </section>
        )
    }
}