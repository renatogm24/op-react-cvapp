import React, { Component } from "react";
import {
  faChevronDown,
  faPlus,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SectionDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
    };
  }

  render() {
    const { id, name, expanded, onExpandButton } = this.props;
    const { elements } = this.state;
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
          <div className="sectionTitle">
            <div>{name}</div>
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

export default SectionDescription;
