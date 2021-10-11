import React, { Component } from "react";

class Field extends Component {
  capitalizeFirstLetter = (stringValue) => {
    const result = stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    return result;
  };

  render() {
    const { field, element, handleChange, edit } = this.props;
    if (edit) {
      return (
        <div className="field">
          <label htmlFor={"element" + field.name}>
            {" "}
            {this.capitalizeFirstLetter(field.name)}:{" "}
          </label>
          <input
            defaultValue={element[field.name]}
            name={field.name}
            type={field.type}
            id={"element" + field.name}
          />
        </div>
      );
    } else {
      return (
        <div className="field">
          <label htmlFor={"element" + field.name}>
            {" "}
            {this.capitalizeFirstLetter(field.name)}:{" "}
          </label>
          <input
            onChange={handleChange}
            value={element[field.name]}
            name={field.name}
            type={field.type}
            id={"element" + field.name}
          />
        </div>
      );
    }
  }
}

export default Field;
