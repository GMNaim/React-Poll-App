import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  CustomInput,
  Label,
  Button,
} from "reactstrap";

class ParticipationForm extends React.Component {
  state = {
    name: "", // name of the participants
    selectedOption: "", // which option the participants select
    errors: {}, // validation errors
  };

  handleOnChange = (event) => {
    // handle anykind of event change
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    // handle the on submit event
    event.preventDefault(); // stop the default browser setup.. like reload on submit...
    const { isValid, errors } = this.participationFormValidation(); // destructuring the functions returnd values(an object)..
    if (isValid) {
      const { name, selectedOption } = this.state; // destructuring...
      this.props.getParticipantsOpinion({
        // getParticipantsOpinion is a function will come from outside. which is taking an object as argument. the obj is information about the participants and his opinion
        pollId: this.props.poll.id, // which poll is getting the opinion.
        name: name,
        selectedOption: selectedOption,
      });
      event.target.reset(); // reseting the from
      this.setState({
        // reseting the state properties
        name: "",
        selectedOption: "",
        errors: {},
      });
    } else {
      // if isValid if false then populating the errors property of the state with errors info getting from the participationFormValidation function.
      this.setState({ errors });
    }
  };

  participationFormValidation = () => {
    // this function is validating the participation form
    const errors = {};
    const { name, selectedOption } = this.state;
    if (!name) {
      errors.name = "Please Provide your name";
    } else if (name.length > 20) {
      errors.name = "Name Too long";
    }

    if (!selectedOption) {
      errors.selectedOption = "Please Select One Option";
    }

    return {
      // returning an object
      errors, // es6 syntax of obj property. if same name of key and value then only write the key.
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    console.log(this.state.errors.selectedOption, "---error selectedOption");
    return (
      // returning the form jsx
      <Form onSubmit={this.handleOnSubmit}>
        <div className="d-flex">
          <h4>Options</h4>
          <Button
            className="ml-auto"
            color="warning"
            type="button"
            onClick={this.props.toggleEditModalForm} // agter clicking the button a modal form will open. for opening the modal, toggleEditModalForm function wil perform the task which is getting from outside
          >
            Edit
          </Button>

          <Button
            // this button will delete the poll
            type="button"
            className="ml-2"
            onClick={() => this.props.deletePoll(this.props.poll.id)}
          >
            Delete
          </Button>
        </div>
        {this.props.poll.options.map((individualOption) => (
          // just showing the options of the poll one by one with the help of map function. we will get the poll from outside. for each option there will be one FormGroup.
          <FormGroup className="my-2" key={individualOption.id}>
            <Label className="d-flex">
              <CustomInput
                type="radio"
                id={individualOption.id}
                name="selectedOption"
                value={individualOption.id}
                onChange={this.handleOnChange}
                invalid={this.state.errors.selectedOption ? true : false} // there is any error related selectedOption then true.
              />
              {individualOption.value}
              <span
                // This span is for showing the vote number.
                style={{
                  padding: "5px 20px",
                  background: "green",
                  color: "white",
                  borderRadius: "5px",
                }}
                className="ml-auto"
              >
                {individualOption.vote}
              </span>

              <span
                // this is span is for showing the vote percentage
                style={{
                  padding: "5px 20px",
                  background: "orange",
                  color: "white",
                  borderRadius: "5px",
                }}
                className="ml-2"
              >
                {/* this span is for showing the vote percentage...  */}
                {this.props.poll.totalVote > 0
                  ? // calcutatiing the vote percentage
                    (
                      (100 * individualOption.vote) /
                      this.props.poll.totalVote
                    ).toFixed(2)
                  : 0}
                %
              </span>
            </Label>
          </FormGroup>
        ))}

        <FormGroup className="my-3">
          {/* this from group is for participants name */}
          <Label>Enter your Name</Label>
          <Input
            name="name"
            placeholder="Enter your Name"
            value={this.state.name}
            onChange={this.handleOnChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}
        </FormGroup>
        <Button outline color="primary" type="submit">
          Submit Your Opinion
        </Button>
      </Form>
    );
  }
}

ParticipationForm.propTypes = {
  getParticipantsOpinion: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired,
  toggleEditModalForm: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired,
};

export default ParticipationForm;
