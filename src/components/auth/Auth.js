import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import AuthSignin from "./AuthSignin";
import AuthSignup from "./AuthSignup";

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