import React, {Component} from 'react';
import "./NewsModal.css";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import Textarea from "../../common/textarea/Textarea";

export default class NewsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNews: this.props.modalItem
        };
        this.updateNews = this.updateNews.bind(this);
    }

    render() {
        return (
            <div className={"newsModal NewsModalItem-" + this.props.modalItem.id + " " + (this.props.needModal ? "show" : "")}>
                <form onSubmit={this.updateNews}>
                    <img src={this.state.currentNews.imgUrl} alt=""/>
                    <Input type={"file"} name={"modal_imgFile_input"} />
                    <Input labelText={"News title"} name={"modal_title_input"} value={this.state.currentNews.title + "weafasdasdf"}/>
                    <Textarea labelText={"News Content"} name={"modal_content_textarea"} value={this.state.currentNews.content} />
                    <div className="modal_edit_actions">
                        <Button type={"submit"} children={"EDIT"} />
                        <Button type={"button"} children={"CANCEL"} onClick={() => this.props.toggleModal()} />
                    </div>
                </form>
            </div>
        );
    }

    updateNews(e) {
        e.preventDefault();
        console.log(this.state.currentNews);
    }
}
