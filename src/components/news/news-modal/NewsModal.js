import React, {Component} from 'react';
import "./NewsModal.css";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import Textarea from "../../common/textarea/Textarea";

export default class NewsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgBuff: "",
            currentNews: {
                id: "",
                title: "",
                content: "",
                imgUrl: "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png",
                type: "news"
            }
        };
    }

    componentDidMount() {
        if (this.props.buffNews) {
            this.setState({
                ...this.state,
                imgBuff: this.props.buffNews.imgUrl,
                currentNews: this.props.buffNews
            });
        }
    }

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({
            ...this.state,
            currentNews: {
                ...this.state.currentNews,
                [name]: value
            }
        });
    };

    handleImageInputChange = event => {
        this.setState({
            ...this.state,
            imgBuff: URL.createObjectURL(event.target.files[0])
        });
    };


    render() {
        return (
            <div className={"newsModal"}>
                <form onSubmit={this.returnNews} encType={"multipart/form-data"}>
                    <img src={this.state.imgBuff} alt=""/>
                    <Input type={"file"} name={"imgUrl"} onChange={this.handleImageInputChange} />
                    <Input type={"text"} value={this.state.currentNews.title} name={"title"} labelText={"News title"} onChange={this.handleInputChange}/>
                    <Textarea labelText={"News Content"} name={"content"} value={this.state.currentNews.content} onChange={this.handleInputChange} />
                    <div className="modal_edit_actions">
                        <Button type={"submit"} children={"SAVE"} />
                        <Button type={"button"} children={"CANCEL"} onClick={() => {this.props.onCloseBtnClick()}} />
                    </div>
                </form>
            </div>
        );
    }

    returnNews = (e) => {
        e.preventDefault();
        this.props.onSubmitBtnClick(this.state.currentNews);
        this.props.onCloseBtnClick();
    }
}
