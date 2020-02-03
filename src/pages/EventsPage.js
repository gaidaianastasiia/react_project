import React, {Component} from 'react';
import BaseTemplate from "../components/base-template/BaseTemplate";
import Events from "../components/events/Events";

export default class EventsPage extends Component {
  render() {
    return (
      <BaseTemplate>
        <Events/>
      </BaseTemplate>
    )
  }
}