import React, {Component, Fragment} from 'react';
import Header from "../../components/common/header/Header";
import Footer from "../../components/common/footer/Footer";
import Auth from "../../components/auth/Auth";

export default class SigninPage extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <main>
                    <Auth type={"signin"}/>
                </main>
                <Footer/>
            </Fragment>
        )
    }
}