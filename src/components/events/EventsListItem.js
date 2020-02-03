import React, {Fragment} from "react";
import Button from "../common/button/Button";
import {EventsContext} from "./Events";

const EventsListItem = ({event}) => (
    <EventsContext.Consumer>
        {({isAdmin, handleEditBtnClick, handleDeleteBtnClick}) => (
            <li className="events__item">
                {isAdmin && (
                    <div className="events__controls">
                        <Button theme={"control"} size={"auto"} onClick={() => handleEditBtnClick(event)}>
                            <i className="icon-edit"></i>
                        </Button>
                        <Button theme={"control"} size={"auto"} onClick={() => handleDeleteBtnClick(event.id)}>
                            <i className="icon-trash"></i>
                        </Button>
                    </div>
                )}

                <div className="events__content">
                    <h3 className="title title_item">{event.name}</h3>
                    <p><span>Description: </span>{event.description}</p>
                    <p><span>Date: </span>{event.date}</p>

                    {event.full_day ?
                        (<p className="events__full-day">Full Day Event</p>) :
                        (<Fragment>
                            <p><span>Start Time: </span>{event.start_time}</p>
                            <p><span>End Time: </span>{event.end_time}</p>
                        </Fragment>)}
                </div>
            </li>
        )}
    </EventsContext.Consumer>
);

export default EventsListItem;
