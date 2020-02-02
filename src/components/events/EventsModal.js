import React, {Component} from "react";
import Input from "../common/input/Input";
import Button from "../common/button/Button";

export default class EventsModal extends Component {
    constructor(props) {
        super();
        this.updetingEvent = props.event;
    }

    state = {
        name: "",
        date: "",
        start_time: "",
        end_time: "",
        full_day: false,
        disabled: false
    };

    componentDidMount = () => {
        if (this.updetingEvent) {
            const {name, date, start_time, end_time, full_day} = this.updetingEvent;
            this.setState({
                ...this.state,
                name,
                date,
                start_time,
                end_time,
                full_day
            });
        }
    };

    handleInputChange = ({target: {name, value}}) => {
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    handleCheckboxChange = ({target: {checked}}) => {
        this.setState({
            ...this.props,
            start_time: "",
            end_time: "",
            disabled: checked,
            full_day: checked
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {name, date, start_time, end_time, full_day} = this.state;
        this.props.handleSubmit({name, date, start_time, end_time, full_day});
    };

    render() {
        const {name, date, start_time, end_time, full_day, disabled} = this.state;
        const {handleCloseBtnClick} = this.props;

        return (
            <div className="modal">
                <form className="modal__form">
                    <div className="modal__close-btn">
                        <Button theme={"light"} size={"auto"} onClick={handleCloseBtnClick}>x</Button>
                    </div>

                    <Input name={"name"} value={name} onChange={this.handleInputChange} labelText={"Name"}/>
                    <Input type={"date"} name={"date"} value={date} onChange={this.handleInputChange} labelText={"Date"}/>
                    <Input type={"time"} name={"start_time"} value={start_time} onChange={this.handleInputChange} labelText={"Start Time"} disabled={disabled}/>
                    <Input type={"time"} name={"end_time"} value={end_time} onChange={this.handleInputChange} labelText={"End Time"} disabled={disabled}/>
                    <Input type={"checkbox"} name={"full_day"} isChecked={full_day} onChange={this.handleCheckboxChange} labelText={"Full Day Event"}/>

                    <Button type={"submit"} onClick={this.handleSubmit}>
                        Save
                    </Button>
                </form>
            </div>
        );
    }
}
