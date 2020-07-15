import React from "react";
import PropTypes from "prop-types";
// import shortid from "shortid";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

const PollModalForm = ({
  title,
  description,
  options,
  errors,
  buttonValue,
  handleOnChange,
  handlePollOptionChange,
  createPollOption,
  deletePollOption,
  handle_Create_Update_OnSubmit,
}) => (
    <Form onSubmit={handle_Create_Update_OnSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          id="title"
          placeholder="Write poll title"
          value={title}
          onChange={handleOnChange}
          invalid={errors.title ? true : false}
        />
        {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          placeholder="Describe your Poll"
          value={description}
          onChange={handleOnChange}
          invalid={errors.description ? true : false}
        />
        {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label>
          Enter options
        <span
            style={{
              marginLeft: "30px",
              background: "green",
              padding: "5px",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={createPollOption}
          >
            Add Options
        </span>
        </Label>
        {console.log(
          options.length,
          "length of option right before the options are created. "
        )}

        {options.map((individualOption, optionIndex) => (

          <div key={individualOption.id} className="d-flex my-2">
            {alert(individualOption)}
            <Input
              value={individualOption.value}
              onChange={(event) => handlePollOptionChange(event, optionIndex)}
              invalid={
                errors.options && errors.options[optionIndex] ? true : false
              } // checking if  there is options inside the error obj and in options array if the index of the current option is exists
            />
            {errors.options && (
              <FormFeedback>{errors.options[optionIndex]}</FormFeedback>
            )}
            <Button
              //   button for delete
              color="danger"
              disabled={options.length <= 2}
              className="ml-2"
              onClick={() => deletePollOption(optionIndex)}
            >
              Delete
          </Button>
          </div>
        ))}
      </FormGroup>
      <Button color="primary" type="submit">
        {buttonValue}
      </Button>
    </Form>
  );


PollModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  buttonValue: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handlePollOptionChange: PropTypes.func.isRequired,
  createPollOption: PropTypes.func.isRequired,
  deletePollOption: PropTypes.func.isRequired,
  handle_Create_Update_OnSubmit: PropTypes.func.isRequired,
};

export default PollModalForm;
