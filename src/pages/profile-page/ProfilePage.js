import React, {Component} from 'react';
import BaseTemplate from "../../components/base-template/BaseTemplate";
import Profile from "../../components/profile/Profile";

export default class ProfilePage extends Component {
    render() {
        return (
            <BaseTemplate>
                <Profile/>
            </BaseTemplate>
        )
    }
}