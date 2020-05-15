import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

const PollsList = (props) => {
  console.log(props.polls, "=========================");
  if (props.polls.length === 0) {
    return <p>There is no poll</p>;
  }
  return (
    <ListGroup>
      {props.polls.map((singlePOll) => (
        <ListGroupItem
          key={singlePOll.id}
          onClick={() => props.selectPoll(singlePOll.id)}
          style={{ cursor: "pointer" }}
        >
          {/* if the title length is more than 30 character then show first 30 char and .... otherwise show the full title....  */}

          {singlePOll.title.length > 30
            ? singlePOll.title.substr(0, 30) + "..."
            : singlePOll.title}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

PollsList.propTypes = {
  polls: PropTypes.array.isRequired,
  selectPoll: PropTypes.func.isRequired,
};

export default PollsList;
