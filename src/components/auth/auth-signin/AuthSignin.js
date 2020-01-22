import React, {Component} from 'react';
import "./AuthSignin.css";
import Input from "../../common/input/Input";

export default class AuthSignin extends Component {
    state = {
        user: {
            email: {
                value: "",
                errMessage: "",
            },
            password: {
                value: "",
                errMessage: "",
            }
        }
    }

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                email: {
                    ...this.state.user.email,
                    [name]: value
                }
            }
        });
    }

    renderInputs = (inputsData) => {
        return Object.keys(inputsData)
            .map(control => {
                console.log(control)
            });
    }

    render() {
        const {value: emailValue, errMessage: emailErrMessage} = this.state.user.email;
        const {value: passValue, errMessage: passErrMessage} = this.state.user.password;

        const inputsData = {
            email: {
                type: "email",
                name: "email",
                value: emailValue,
                onChange: this.handleInputChange,
                labelText: "Email",
                errorMessage: emailErrMessage
            },
            password: {
                type: "password",
                name: "emapasswordil",
                value: passValue,
                onChange: this.handleInputChange,
                labelText: "Password",
                errorMessage: passErrMessage
            }
        };

        console.log(this.renderInputs(inputsData));

        return (
            <section className="auth">
                <h2 className="auth__title">Signin</h2>

                <form action="#" className="auth__form">
                    <Input
                        type={"email"}
                        name={"email"}
                        value={emailValue}
                        onChange={this.handleInputChange}
                        labelText={"Email"}
                        errorMessage={emailErrMessage}
                    />
                    <Input
                        type={"password"}
                        name={"password"}
                        value={passValue}
                        onChange={this.handleInputChange}
                        labelText={"Password"}
                        errorMessage={passErrMessage}
                    />
                </form>
            </section>
        )
    }
}