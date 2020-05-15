import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import ParticipationForm from "./participation-form";
import PollForm from "../poll-form";

class MainContent extends React.Component {
  state = {
    openModal: false,
  };

  toggleEditModalForm = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    if (Object.keys(this.props.poll).length === 0) {
      return (
        <div>
          <h3>Welcome to My Application</h3>
          <p>
            You can create as many poll as you want. Click the new button to
            create a new poll. To check details of a poll please select from the
            left sidebar. By selecting a poll you can check it's details,
            participate and check others opinions about this poll.
          </p>
        </div>
      );
    }

    const { poll, getParticipantsOpinion, updatePoll, deletePoll } = this.props;
    return (
      <div>
        <h3>{poll.title}</h3>
        <p>{poll.description}</p>

        <ParticipationForm
          poll={poll}
          getParticipantsOpinion={getParticipantsOpinion}
          toggleEditModalForm={this.toggleEditModalForm}
          deletePoll={() => deletePoll(poll.id)}
        />

        <Modal
          // this modal is for update the poll
          isOpen={this.state.openModal}
          toggle={this.toggleEditModalForm}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleEditModalForm}>
            Update Poll
          </ModalHeader>
          <ModalBody>
            <PollForm
              poll={poll}
              isUpdate={true}
              submit_Create_Update_Poll={updatePoll}
              // updatePoll func will come by props.
              buttonValue="Update Poll"
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

MainContent.propTypes = {
  poll: PropTypes.object.isRequired,
  getParticipantsOpinion: PropTypes.func.isRequired,
  updatePoll: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired,
};

export default MainContent;
