import React, {Component, Fragment} from 'react';
import Header from "../common/header/Header";
import Nav from "../common/nav/Nav";
import PropTypes from 'prop-types';
import Footer from "../common/footer/Footer";

export default class BaseTemplate extends Component {
    static propTypes = {
        children: PropTypes.element,
    }

    static defaultProps = {
        children: null,
    }

    render() {
        const {children} = this.props;

        return (
            <Fragment>
                <Header/>
                <aside className="aside">
                    <Nav/>
                </aside>
                <main className="main">
                    {children}
                </main>
                <Footer/>
            </Fragment>
        )
    }
}