import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

import PollModalForm from "./poll-form";
const defaultOptions = [
  // defaultly there will be 2 options.
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
];
class PollForm extends React.Component {
  state = {
    title: "",
    description: "",
    options: defaultOptions,
    errors: {}, // to store all the errors in the validation func...
  };

  // using life cycle method for showing the existing values to the input fields when we updating the poll... when we create the poll then the fields are empty(state properties value is empty) but when we update a poll we can show the existing values by updating the state proerties using life cycle mehtod.
  componentDidMount() {
    const { poll } = this.props;
    if (poll && Object.keys(poll).length > 0) {
      // when poll is exist and poll has information, not empty poll... then...
      this.setState({
        title: poll.title,
        description: poll.description,
        options: poll.options,
      });
    }
  }

  handleOnChange = (event) => {
    // this function will handle the change inside the input field like title field, or description field...
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlePollOptionChange = (event, indexOption) => {
    // * indexOfOption is for identify the individual option from the options array.
    // options is actually an array .. where all the option will be stored. in this func we are just adding the value of the option from the user by the form(this function will be called in form Component).. and update the state with the updated options property...
    // const options = [...this.state.options];  // spreading
    const { options } = this.state; // destructuring....
    options[indexOption].value = event.target.value;
    this.setState({ options }, () =>
      console.log("in handle poll options change ========", this.state.options)
    );
  };

  createPollOption = () => {
    const { options } = this.state; // destructuring...
    if (options.length < 5) {
      options.push({
        id: shortid.generate(),
        value: "",
        vote: 0,
      });
      this.setState({ options });
    } else {
      alert("You can create maximum 5 options");
    }
  };

  deletePollOption = (indexOfOption) => {
    const { options } = this.state;
    if (options.length > 2) {
      options.splice(indexOfOption, 1); // splice(start_from, number_of_option_to_delete)
      console.log(this.state.options, "after splice/delete operation");
      this.setState({ options });
    } else {
      alert("You must have at least two options");
    }
  };

  handle_Create_Update_OnSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = this.formValidate();
    if (isValid) {
      const { title, description, options } = this.state;
      const poll = {
        title,
        description,
        options,
      };
      if (this.props.isUpdate) {
        // ==========updating the poll =========
        //when we click edit to a poll then we pass the isUpdate=ture. if we want to update a poll then it should have an id to pass. so adding the id with the poll object.
        poll.id = this.props.poll.id;
        // and we have to call the update function to perform update operation...
        this.props.submit_Create_Update_Poll(poll);

        alert("Poll Updated Successfully.");
        this.props.toggleModalEditForm(); // to close the modal form
      } else {
        // ======== creating new poll =========

        const { title, description, options } = this.state;
        console.log(options, '------------------options')
        const poll = {
          title,
          description,
          options,
        };
        this.props.addNewPoll(poll);
        event.target.reset(); // cleaning the form

        this.setState(
          {
            // reseting the state properties.
            title: "",
            description: "",
            errors: {},
          },
          () => {
            this.setState({ options: defaultOptions })
            alert('poll created')
            this.props.toggleModalCreatePollForm(); // to close the modal form);
          }
        );
        console.log(this.state.options, '------------------options after reset the state')
      }
    } else {
      this.setState({ errors });
    }
  };

  formValidate = () => {
    const errors = {};
    const { title, description, options } = this.state;

    if (!title) {
      errors.title = "Please Provide a Title";
    } else if (title.length < 20) {
      errors.title = "Title Too Short";
    } else if (title.length > 100) {
      errors.title = "Title is Too Long";
    }

    if (!description) {
      errors.description = "Please Provide A Description";
    } else if (description.length > 500) {
      errors.description = "Description Too Long";
    }

    const optionErrors = []; // to keep all errors related options
    options.forEach((individualOption, individualOptionsIndex) => {
      if (!individualOption.value) {
        optionErrors[individualOptionsIndex] = "Option Text Empty";
        // optionErrors.push('Option Text Empty')
      } else if (individualOption.value.length > 100) {
        optionErrors[individualOptionsIndex] = "Option Text Too Long";
      }
    });

    if (optionErrors.length > 0) {
      errors.options = optionErrors;
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    const { title, description, options, errors } = this.state;
    return (
      <PollModalForm
        title={title}
        description={description}
        options={options}
        buttonValue={this.props.buttonValue || "Create Poll"}
        errors={errors}
        handleOnChange={this.handleOnChange}
        handlePollOptionChange={this.handlePollOptionChange}
        createPollOption={this.createPollOption}
        deletePollOption={this.deletePollOption}
        handle_Create_Update_OnSubmit={this.handle_Create_Update_OnSubmit}
      />
    );
  }
}

PollForm.propTypes = {
  submit_Create_Update_Poll: PropTypes.func.isRequired,
  buttonValue: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};
export default PollForm;
