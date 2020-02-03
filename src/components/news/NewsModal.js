import React, {Component} from "react";
import ValidationService from "../../services/ValidationService";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import Textarea from "../common/textarea/Textarea";

export default class NewsModal extends Component {
  constructor(props) {
    super();
    this.updatingNews = props.updatingNews;
    this.validationService = new ValidationService();
  }

  state = {
    currentNews: {
      id: "",
      title: "",
      content: "",
      imgUrl: "https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png",
      type: "news",
      file: ""
    },
    titleErrMessage: "",
    contentErrMessage: ""
  };

  componentDidMount = () => {
    if (this.updatingNews) {
      const {title, content, imgUrl, type} = this.updatingNews;

      this.setState({
        ...this.state,
        currentNews: {
          ...this.state.currentNews,
          title,
          content,
          imgUrl,
          type
        }
      });
    }
  };

  handleInputChange = ({target: {name, value}}) => {
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
      currentNews: {
        ...this.state.currentNews,
        imgUrl: URL.createObjectURL(event.target.files[0])
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {title, content, imgUrl, type} = this.state.currentNews;
    const titleValidData = this.validationService.validateTextField(title);
    const contentValidData = this.validationService.validateTextField(content);

    if (titleValidData.isValid && contentValidData.isValid) {
      this.props.handleSubmit({title, content, imgUrl, type});
    } else {
      this.setState({
        ...this.state,
        titleErrMessage: titleValidData.errMessage,
        contentErrMessage: contentValidData.errMessage,
        currentNews: {
          ...this.state.currentNews
        }
      });
    }
  };

  render() {
    const {title, content, imgUrl} = this.state.currentNews;
    const {titleErrMessage, contentErrMessage} = this.state;
    const {handleCloseBtnClick} = this.props;

    return (
      <div className="modal">
        <form className={"modal__form"} onSubmit={this.handleSubmit} encType={"multipart/form-data"}>
          <div className="modal__close-btn">
            <Button theme={"light"} size={"auto"} onClick={handleCloseBtnClick}>x</Button>
          </div>

          <img src={imgUrl} alt=""/>
          <Input type={"file"} name={"imgUrl"} onChange={this.handleImageInputChange} labelText={"Select image"}/>
          <Input type={"text"} value={title} name={"title"} onChange={this.handleInputChange} labelText={"News title"} errorMessage={titleErrMessage}/>
          <Textarea value={content} name={"content"} onChange={this.handleInputChange} labelText={"News Content"} errorMessage={contentErrMessage}/>

          <Button type={"submit"}>Save</Button>
        </form>
      </div>
    );
  }
}
