import React from "react";
import shortid from "shortid";
import { Container, Row, Col } from "reactstrap";

import MainContent from "./component/main-content";
import SideBar from "./component/sidebar";

import POLLS from "./data/polls";

class App extends React.Component {
  state = {
    polls: [],
    selectedPoll: {}, // when we select an poll to see its detail information then it will use to keep that poll
    searchTerm: "", // searched text
  };

  // use of life cycle method.. to populate the state property...
  componentDidMount() {
    this.setState({ polls: POLLS });
  }

  // CRUD OPEARATIONS
  addNewPoll = (poll) => {
    poll.id = shortid.generate();
    poll.created = new Date();
    poll.totalVote = 0;
    poll.opinions = [];

    // concate with the previous poll
    this.setState({ polls: this.state.polls.concat(poll) }); // concat method works in immutable way and return a new array after adding new property...
  };

  updatePoll = (updatedPoll) => {
    const copyPolls = [...this.state.polls]; // just creating a copy of the existing polls
    const foundPollForUpdate = copyPolls.find(
      (singlePole) => singlePole.id === updatedPoll.id
    ); // find the poll which poll id is same with the updated poll id...

    foundPollForUpdate.title = updatedPoll.title;
    foundPollForUpdate.description = updatedPoll.description;
    foundPollForUpdate.options = updatedPoll.options;
  };

  deletePoll = (deletedPollId) => {
    // this function will delete a  poll
    // for that we just keep the polls that is not deleted in the state..

    console.log("deleted poll id=======", deletedPollId);
    const filteredPollsThatNotDeleted = this.state.polls.filter(
      (singlePole) => singlePole.id !== deletedPollId
    ); // contain the polls those id is not equal to deletedPollId
    console.log(
      filteredPollsThatNotDeleted,
      "---filteredPolls THat not deleted ------"
    );
    this.setState(
      { polls: filteredPollsThatNotDeleted, selectedPoll: {} },
      () => console.log("after delelte polls are: ", this.state.polls)
    );
  };

  selectPoll = (selectedPollId) => {
    // this function will do the selection of polls. that means to see the details of the poll if click on it what will happen.
    // just put the poll inside the selectedPoll object inside the state.

    // getting the selected poll by finding the id of the poll. we will get poll's id as  paremeter
    const selectedPoll = this.state.polls.find(
      (singlePole) => singlePole.id === selectedPollId
    );
    // now just update the selectedPoll object in the state... with the currently selected  poll
    this.setState({ selectedPoll: selectedPoll });
  };

  getParticipantsOpinion = (participantsRespones) => {
    // this function will perform the opinion related task. add the participants opinion to the selected poll
    const { polls } = this.state; // all the poll
    const poll = polls.find(
      (individualPoll) => individualPoll.id === participantsRespones.pollId
    ); // finding the poll which is got the participants opinion.

    const option = poll.options.find(
      (individualOption) =>
        individualOption.id === participantsRespones.selectedOption
    ); // find the option of the poll that got the opinion

    poll.totalVote++; // every poll has total vote count. that is incrementing
    option.vote++; // the option which is got the vote that option vote number is incrementing

    const opinion = {
      // opinion object to store into polls opinions array.
      id: shortid.generate(),
      name: participantsRespones.name,
      selectedOption: participantsRespones.selectedOption,
    };

    poll.opinions.push(opinion); // polls array has an opinions options. which collect all the opinion object
    this.setState({});
  };

  handleSearch = (searchTerm) => {
    //perform the search functionality....
    this.setState({ searchTerm: searchTerm });
    // as setState is asynchronous so we can filterout the searchTerm with title in this function. for that we have to use another function.
  };

  performSearch = () => {
    return this.state.polls.filter((poll) =>
      poll.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  render() {
    const searchedPolls = this.performSearch();
    console.log(this.state);
    return (
      <Container className="my-5">
        <Row>
          <Col md={4} className="">
            <SideBar
              // calling sidebar component
              polls={searchedPolls}
              selectPoll={this.selectPoll}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
              addNewPoll={this.addNewPoll}
            />
          </Col>
          <Col md={8}>
            <MainContent
              poll={this.state.selectedPoll}
              getParticipantsOpinion={this.getParticipantsOpinion}
              updatePoll={this.updatePoll}
              deletePoll={this.deletePoll}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
