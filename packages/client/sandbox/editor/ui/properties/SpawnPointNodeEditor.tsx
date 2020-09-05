import React, { Component } from "react";
import NodeEditor from "./NodeEditor";
import { StreetView } from "@styled-icons/fa-solid/StreetView";
type SpawnPointNodeEditorProps = {
  editor?: object,
  node?: object
};
export default class SpawnPointNodeEditor extends Component<
  SpawnPointNodeEditorProps,
  {}
> {
  render() {
    return (
      <NodeEditor
        description={SpawnPointNodeEditor.description}
        {...this.props}
      />
    );
  }
}