import React from "react";
import PropTypes from "prop-types";
import { Input, Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import PollsList from "./poll-list";
import PollForm from "../poll-form";

class SideBar extends React.Component {
  state = {
    openModal: false,
  };
  toggleModalCreatePollForm = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    console.log(this.props.polls, typeof this.props.polls);
    return (
      <div style={{ background: "#efefef", padding: "10px" }}>
        <div className="d-flex mb-5">
          <Input
            type="search"
            placeholder="Search Polls"
            value={this.props.searchTerm}
            onChange={(event) => this.props.handleSearch(event.target.value)}
          />
          <Button
            color="success"
            className="ml-2"
            onClick={this.toggleModalCreatePollForm}
          >
            New
          </Button>
        </div>

        <h3>List of Polls</h3>
        <hr />
        <PollsList
          polls={this.props.polls}
          selectPoll={this.props.selectPoll}
        />
        <Modal
          // this modal is for creating new poll
          isOpen={this.state.openModal}
          toggle={this.toggleModalCreatePollForm}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModalCreatePollForm}>
            Create A New Poll
          </ModalHeader>
          <ModalBody>
            <PollForm
              // this poll form is for creating new poll
              addNewPoll={this.props.addNewPoll}
              toggleModalCreatePollForm={this.toggleModalCreatePollForm}
              pollOptions={this.props.pollOptions}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

SideBar.propTypes = {
  polls: PropTypes.array.isRequired,
  selectPoll: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  addNewPoll: PropTypes.func.isRequired,
};
export default SideBar;
