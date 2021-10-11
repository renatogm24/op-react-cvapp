import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import Field from "./Field";

class Elements extends Component {
  render() {
    const {
      elements,
      sectionName,
      onDeleteElement,
      onEditElement,
      onSubmitChanges,
      fields,
    } = this.props;
    if (elements.length > 0) {
      switch (sectionName) {
        case "Personal Info":
          return elements.map((element) => {
            if (element.onEdit) {
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
                            edit={true}
                          />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                  <button
                    onClick={(e) => onSubmitChanges(element.id, e)}
                    className="onSubmitElement"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <div>Update</div>
                  </button>
                </form>
              );
            } else {
              return (
                <div key={element.id} className="elementPersonal">
                  <div className="elementData">
                    <div>{element.name + " " + element.lastname}</div>
                    <div>{element.email}</div>
                    <div>{element.number}</div>
                    <div>{element.address}</div>
                  </div>
                  <div className="elementActions">
                    <button onClick={(e) => onEditElement(element.id, e)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={(e) => onDeleteElement(element.id, e)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            }
          });

        default:
          return elements.map((element) => {
            if (element.onEdit) {
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
                            edit={true}
                          />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                  <button
                    onClick={(e) => onSubmitChanges(element.id, e)}
                    className="onSubmitElement"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <div>Update</div>
                  </button>
                </form>
              );
            } else {
              return (
                <div key={element.id} className="elementPersonal">
                  <div className="elementData">
                    {Object.keys(element).map((key) => {
                      if (key !== "id") {
                        return <div key={key}>{element[key]}</div>;
                      } else {
                        return null;
                      }
                    })}
                  </div>
                  <div className="elementActions">
                    <button onClick={(e) => onEditElement(element.id, e)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={(e) => onDeleteElement(element.id, e)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            }
          });
      }
    } else {
      return null;
    }
  }
}

export default Elements;
