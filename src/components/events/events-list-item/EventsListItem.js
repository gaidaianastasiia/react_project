import React, { Fragment } from "react";
import Button from "../../common/button/Button";
import { EventsContext } from "../Events";

const EventsListItem = ({ event }) => (
  <EventsContext.Consumer>
    {({ isAdmin, handleEditBtnClick, handleDeleteBtnClick }) => (
      <li>
        <div>
          <p>
            Name: <b>{event.name}</b>
          </p>
          <p>Description: {event.description}</p>
          <p>Date: {event.date}</p>
          {event.full_day ? (
            <p>Full Day Event</p>
          ) : (
            <Fragment>
              <p>Start Time: {event.start_time}</p>
              <p>End Time: {event.end_time}</p>
            </Fragment>
          )}

          {isAdmin && (
            <div>
              <Button size={"small"} onClick={() => handleEditBtnClick(event)}>
                Edit
              </Button>
              <Button
                size={"small"}
                onClick={() => handleDeleteBtnClick(event.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </li>
    )}
  </EventsContext.Consumer>
);

export default EventsListItem;
