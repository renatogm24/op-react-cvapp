import React, { Component } from "react";
import "./App.css";
import SectionInscription from "./components/SectionInscription";
import SectionDescription from "./components/SectionDescription";
import uniqid from "uniqid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      preview: false,
      sections: [
        {
          id: uniqid(),
          name: "Personal Info",
          type: "inscription",
          fields: [
            { name: "id", type: "id" },
            { name: "onEdit", type: "boolean" },
            { name: "name", type: "text" },
            { name: "lastname", type: "text" },
            { name: "email", type: "text" },
            { name: "number", type: "text" },
            { name: "address", type: "text" },
          ],
          expanded: false,
        },
        {
          id: uniqid(),
          name: "Education",
          type: "inscription",
          fields: [
            { name: "id", type: "id" },
            { name: "onEdit", type: "boolean" },
            { name: "career", type: "text" },
            { name: "institution", type: "text" },
            { name: "start", type: "text" },
            { name: "end", type: "text" },
          ],
          expanded: false,
        },
        {
          id: uniqid(),
          name: "Experience",
          type: "inscription",
          fields: [
            { name: "id", type: "id" },
            { name: "onEdit", type: "boolean" },
            { name: "position", type: "text" },
            { name: "company", type: "text" },
            { name: "start", type: "text" },
            { name: "end", type: "text" },
          ],
          expanded: false,
        },
      ],
    };
    this.onExpandButton = this.onExpandButton.bind(this);
  }

  sectionByType = (section) => {
    switch (section.type) {
      case "inscription":
        return (
          <SectionInscription
            id={section.id}
            name={section.name}
            expanded={section.expanded}
            onExpandButton={this.onExpandButton}
            fields={section.fields}
            preview={this.state.preview}
          />
        );
      case "description":
        return (
          <SectionDescription
            id={section.id}
            name={section.name}
            expanded={section.expanded}
            onExpandButton={this.onExpandButton}
            fields={section.fields}
            preview={this.state.preview}
          />
        );
      default:
        return null;
    }
  };

  onExpandButton = (id) => {
    const sectionsArrayCopy = [...this.state.sections];
    for (let index = 0; index < sectionsArrayCopy.length; index++) {
      const section = sectionsArrayCopy[index];
      if (section.id === id) {
        section.expanded = !section.expanded;
      } else {
        section.expanded = false;
      }
    }

    this.setState({
      sections: sectionsArrayCopy,
    });
  };

  onPreviewButton = () => {
    this.setState({
      preview: !this.state.preview,
    });
  };

  render() {
    const { sections, preview } = this.state;
    return (
      <div className="container">
        {(() => {
          if (preview) {
            return (
              <button
                onClick={this.onPreviewButton}
                className="onPreviewElement"
              >
                <div>Edit</div>
              </button>
            );
          } else {
            return (
              <button
                onClick={this.onPreviewButton}
                className="onPreviewElement"
              >
                <div>Preview</div>
              </button>
            );
          }
        })()}
        {sections.map((section) => {
          return <div key={section.id}>{this.sectionByType(section)}</div>;
        })}
      </div>
    );
  }
}

export default App;
