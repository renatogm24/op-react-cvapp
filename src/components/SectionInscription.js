import React, { Component } from "react";
import Elements from "./Elements";
import Field from "./Field";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faMailBulk,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uniqid from "uniqid";

class SectionInscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      element: this.props.fields.reduce((elem, field) => {
        if (field.name === "id") {
          elem.id = uniqid();
        } else if (field.name === "onEdit") {
          elem.onEdit = false;
        } else {
          elem[field.name] = "";
        }
        return elem;
      }, {}),
      addNew: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDeleteElement = this.onDeleteElement.bind(this);
    this.onEditElement = this.onEditElement.bind(this);
    this.onSubmitChanges = this.onSubmitChanges.bind(this);
  }

  onAddElement = () => {
    this.setState({
      addNew: true,
    });
  };

  onSubmitElement = (e) => {
    e.preventDefault();
    this.setState({
      elements: this.state.elements.concat(this.state.element),
      element: this.props.fields.reduce((elem, field) => {
        if (field.name === "id") {
          elem.id = uniqid();
        } else {
          elem[field.name] = "";
        }
        return elem;
      }, {}),
      addNew: false,
    });
  };

  onSubmitChanges = (id, e) => {
    e.preventDefault();
    const elementsArrayCopy = [...this.state.elements];

    for (let index = 0; index < elementsArrayCopy.length; index++) {
      const element = elementsArrayCopy[index];
      if (element.id === id) {
        this.props.fields.reduce((elemaux, field) => {
          if (field.name !== "id" && field.name !== "onEdit") {
            elemaux[field.name] = e.target
              .closest("form")
              .querySelector("#element" + field.name).value;
          }
          return elemaux;
        }, element);
        element.onEdit = false;
      }
    }

    this.setState({
      elements: elementsArrayCopy,
    });
  };

  onDeleteElement = (id, e) => {
    const elementsArrayCopy = [...this.state.elements];
    let elementToDelete;
    for (let index = 0; index < elementsArrayCopy.length; index++) {
      const element = elementsArrayCopy[index];
      if (element.id === id) {
        elementToDelete = index;
      }
    }

    this.setState({
      elements: [
        ...this.state.elements.slice(0, elementToDelete),
        ...this.state.elements.slice(elementToDelete + 1),
      ],
    });
  };

  onEditElement = (id, e) => {
    const elementsArrayCopy = [...this.state.elements];
    for (let index = 0; index < elementsArrayCopy.length; index++) {
      const element = elementsArrayCopy[index];
      if (element.id === id) {
        element.onEdit = true;
      }
    }

    this.setState({
      elements: elementsArrayCopy,
    });
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      element: {
        ...this.state.element,
        [e.target.name]: value,
      },
    });
  };

  render() {
    const { id, name, expanded, onExpandButton, fields, preview } = this.props;
    const { elements, addNew, element } = this.state;
    if (preview) {
      if (name === "Personal Info" && elements.length > 0) {
        return (
          <div className="previewHeader">
            <div className="previewTitle">
              {elements[0].name + " " + elements[0].lastname}
            </div>
            <div className="previewInfo">
              <div className="previewInfo2">
                <FontAwesomeIcon icon={faMailBulk} />
                {elements[0].email}
              </div>
              <div className="previewInfo2">
                <FontAwesomeIcon icon={faPhone} />
                {elements[0].number}
              </div>
            </div>
          </div>
        );
      } else if (name === "Education" && elements.length > 0) {
        return (
          <div className="previewSection">
            <div className="previewSectionTitle">Education</div>
            {elements.map((element) => {
              return (
                <div className="previewSectionInfo">
                  <div className="previewSectionData">
                    <div>{element.career}</div>
                    <div>{element.institution}</div>
                  </div>
                  <div className="previewSectionDate">
                    {element.start} - {element.end}
                  </div>
                </div>
              );
            })}
          </div>
        );
      } else if (name === "Experience" && elements.length > 0) {
        return (
          <div className="previewSection">
            <div className="previewSectionTitle">Experience</div>
            {elements.map((element) => {
              return (
                <div className="previewSectionInfo">
                  <div className="previewSectionData">
                    <div>{element.position}</div>
                    <div>{element.company}</div>
                  </div>
                  <div className="previewSectionDate">
                    {element.start} - {element.end}
                  </div>
                </div>
              );
            })}
          </div>
        );
      } else {
        return null;
      }
    } else {
      if (expanded) {
        return (
          <div id={id} className="sectionOpen">
            <div className="sectionTitle">
              <div>{name}</div>
              <div>
                <button
                  onClick={(e) => onExpandButton(id, e)}
                  className="circleBtn"
                >
                  <FontAwesomeIcon icon={faChevronUp} />
                </button>
              </div>
            </div>
            <div className="sectionBody">
              <Elements
                sectionName={name}
                elements={elements}
                onDeleteElement={this.onDeleteElement}
                onEditElement={this.onEditElement}
                onSubmitChanges={this.onSubmitChanges}
                fields={fields}
              />
              {(() => {
                if (addNew) {
                  return (
                    <form className="formElement">
                      {fields.map((field) => {
                        if (field.name !== "id" && field.name !== "onEdit") {
                          return (
                            <div key={field.name}>
                              <Field
                                field={field}
                                handleChange={this.handleChange}
                                element={element}
                                edit={false}
                              />
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                      <button
                        onClick={this.onSubmitElement}
                        className="onSubmitElement"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                        <div>Completed</div>
                      </button>
                    </form>
                  );
                } else {
                  if (name === "Personal Info" && elements.length > 0) {
                    return null;
                  } else {
                    return (
                      <button
                        onClick={this.onAddElement}
                        className="onAddElement"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        <div>Add information</div>
                      </button>
                    );
                  }
                }
              })()}
            </div>
          </div>
        );
      } else {
        return (
          <div id={id} className="sectionClose">
            <div>{name}</div>
            <div>
              {(() => {
                if (elements.length > 0) {
                  return (
                    <button
                      onClick={(e) => onExpandButton(id, e)}
                      className="circleBtn"
                    >
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={(e) => onExpandButton(id, e)}
                      className="circleBtn"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  );
                }
              })()}
            </div>
          </div>
        );
      }
    }
  }
}

export default SectionInscription;
