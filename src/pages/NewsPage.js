import React, {Component} from 'react';
import BaseTemplate from "../components/base-template/BaseTemplate";
import News from "../components/news/News";

export default class NewsPage extends Component {
    render() {
        return (
            <BaseTemplate>
                <News/>
            </BaseTemplate>
        )
    }
}