import { useState } from "react";
import RadioButtonsComponent from "./RadioButtonsComponent";
import "./FormComponent.css";

const FormComponent = () => {
  const [firstInput, setFirstInput] = useState({
    fullName: "",
    workSpaceName: ""
  });
  const [secondInput, setSecondInput] = useState({
    displayName: "", // displayName==>> I'm treating it as username, so No whitespaces allowed
    workSpaceUrl: ""
  });
  const [pageId, setPageId] = useState(1);
  const [validationErrors, setValidationErrors] = useState({
    fullName: "",
    workSpaceName: "",
    displayName: "", // displayName==>> I'm treating it as username, so No whitespaces allowed
    workSpaceUrl: ""
  });

  const handlefirstInputField = (event) => {
    // setFirstInput({ ...firstInput, [event.target.name]: event.target.value });
    const value = event.target.value;
    const error = validateFirstPage(value);
    setFirstInput({ ...firstInput, [event.target.name]: value });
    setValidationErrors({ ...validationErrors, [event.target.name]: error });
  };

  const handleSecondInputField = (event) => {
    //setSecondInput({ ...secondInput, [event.target.name]: event.target.value });
    const value = event.target.value;
    const error = validateSecondPage(value);
    setSecondInput({ ...secondInput, [event.target.name]: value });
    setValidationErrors({ ...validationErrors, [event.target.name]: error });
  };

  const validateFirstPage = (value) => {
    if (/^\s/.test(value)) {
     return `${
        pageId === 1 ? "*Full name" : "*Workspace Name"
      } cannot have whitespace at the beginning`;
    } else if (!/^[a-zA-Z ]+$/.test(value)) {
      return "*Only alphabets are allowed";
    } else if (value.length < 4) {
      return "*Please enter at least 4 characters";
    } else {
      return "";
    }
  };

  const validateSecondPage = (value) => {
    const regex = /^www\.[\da-z.-]+\.(com|co|org|in|me)([/\w .-]*)*$/i;

    if (pageId === 2 && !regex.test(value)) {
      return "*Please enter a valid URL"; // Alternatively we can also use validator library for validating URL
    } else if (/\s/.test(value)) {
      return `${
        pageId === 1 ? "*Display name" : "*Workspace Url"
      } should not contain any whitespaces"`;
    } else if (pageId === 1 && value.length < 4) {
      return "*Please enter at least 4 characters";
    } else {
      return "";
    }
  };

  const handleCreateWorkspaceSubmit = (event) => {
    event.preventDefault();
    // Validation logic goes here
    // Check if any input field is empty
    if (pageId === 1 && (!firstInput.fullName || !secondInput.displayName)) {
      setValidationErrors({
        ...validationErrors,
        fullName: !firstInput.fullName
          ? "*Full name is required"
          : validationErrors.fullName,
        displayName: !secondInput.displayName
          ? "*Display name is required"
          : validationErrors.displayName
      });
      return;
    }
    if (
      pageId === 2 &&
      (!firstInput.workSpaceName || !secondInput.workSpaceUrl)
    ) {
      setValidationErrors({
        ...validationErrors,
        workSpaceName: !firstInput.workSpaceName
          ? "*Workspace name is required"
          : validationErrors.workSpaceName,
        workSpaceUrl: !secondInput.workSpaceUrl
          ? "*Workspace Url is required"
          : validationErrors.workSpaceUrl
      });
      return;
    }

    if (
      validationErrors.fullName ||
      validationErrors.workSpaceName ||
      validationErrors.displayName ||
      validationErrors.workSpaceUrl
    ) {
      // If there are validation errors, don't proceed with form submission
      return;
    }

    if (pageId < 4) setPageId((prev) => prev + 1);
  };

  const optionalElement = <div className="optionalElement">(Optional)</div>;

  const progressBarStyle = {
    width: `${(pageId - 1) * 33.3}%`
  };

  return (
    <div className="container">
      <div className="headings">
        <section className="star" />
        <h1>Eden</h1>
        <div className="multiform-progress-bar" style={progressBarStyle}></div>
        <div className="multiform-progress-circle-container">
          <div
            className={`multiform-progress-circle ${
              pageId >= 1 ? "active" : ""
            }`}
          >
            1
          </div>
          <div
            className={`multiform-progress-circle ${
              pageId >= 2 ? "active" : ""
            }`}
          >
            2
          </div>
          <div
            className={`multiform-progress-circle ${
              pageId >= 3 ? "active" : ""
            }`}
          >
            3
          </div>
          <div
            className={`multiform-progress-circle ${
              pageId >= 4 ? "active" : ""
            }`}
          >
            4
          </div>
        </div>
        {pageId === 4 && (
          <div className="tick-circle">
            <div className="tick" />
          </div>
        )}
        <h2>
          {pageId === 1
            ? "Welcome! First things first..."
            : pageId === 2
            ? "Let's set up a home for all your work"
            : pageId === 3
            ? "How are you planning to use Eden?"
            : pageId > 3
            ? `Congratulations, ${secondInput.displayName}!`
            : null}
        </h2>
        <span className="lightHeading">
          {pageId === 1
            ? "You can always change them later."
            : pageId === 2
            ? "you can always create another workspace later."
            : pageId === 3
            ? "We'll streamline your setup experience accordingly."
            : pageId > 3
            ? "You have completed onboarding, you can start using the Eden!"
            : null}
        </span>
      </div>
      <form onSubmit={handleCreateWorkspaceSubmit} className="formElement">
        <label htmlFor="fullName" className="labelStyle">
          {pageId === 1 ? "Full Name" : pageId === 2 ? "Workspace Name" : null}
        </label>
        {pageId < 3 && (
          <div>
            <input
              type="text"
              id="fullName"
              name={pageId === 1 ? "fullName" : "workSpaceName"}
              value={
                pageId === 1 ? firstInput.fullName : firstInput.workSpaceName
              }
              onChange={handlefirstInputField}
              className="inputFields"
              placeholder={pageId === 1 ? "Steve Jobs" : "Eden"}
            />
            {pageId === 1 && validationErrors.fullName && (
              <div className="validationError">{validationErrors.fullName}</div>
            )}
            {pageId === 2 && validationErrors.workSpaceName && (
              <div className="validationError">
                {validationErrors.workSpaceName}
              </div>
            )}
          </div>
        )}
        <label htmlFor="displayName" className="labelStyle">
          {pageId === 1 ? (
            "Display Name"
          ) : pageId === 2 ? (
            <span>Workspace URL {optionalElement}</span>
          ) : null}
        </label>
        {pageId < 3 && (
          <div>
            <input
              type="text"
              id="displayName"
              name={pageId === 1 ? "displayName" : "workSpaceUrl"}
              value={
                pageId === 1
                  ? secondInput.displayName
                  : secondInput.workSpaceUrl
              }
              onChange={handleSecondInputField}
              className="inputFields"
              placeholder={pageId === 1 ? "Steve" : "Example: www.eden.com/"}
            />
            {pageId === 1 && validationErrors.displayName && (
              <div className="validationError">
                {validationErrors.displayName}
              </div>
            )}
            {pageId === 2 && validationErrors.workSpaceUrl && (
              <div className="validationError">
                {validationErrors.workSpaceUrl}
              </div>
            )}
          </div>
        )}
        {pageId === 3 && <RadioButtonsComponent />}

        <button type="submit" className="buttonElement">
          {pageId > 3 ? "Launch Eden" : "Create Workspace"}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
