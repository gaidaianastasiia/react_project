import React, {Component, Fragment} from 'react';
import AuthSignin from "./AuthSignin";
import AuthSignup from "./AuthSignup";
import PropTypes from 'prop-types';

export default class Auth extends Component {
    static propTypes = {
        type: PropTypes.oneOf(["signin", "signup"]),
    };

    static defaultProps = {
        type: "signin",
    };

    render() {
        const {type} = this.props;

        return (
            <Fragment>
                {type === "signin" && <AuthSignin/>}
                {type === "signup" && <AuthSignup/>}
            </Fragment>
        )
    }
}