import React, {Component, Fragment} from 'react';
import Header from "../components/common/header/Header";
import Auth from "../components/auth/Auth";
import Footer from "../components/common/footer/Footer";

export default class SignupPage extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <main>
                    <Auth type={"signup"}/>
                </main>
                <Footer/>
            </Fragment>
        )
    }
}