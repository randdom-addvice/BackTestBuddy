import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/js/plugins.pkgd.min.js";
import React, { useState } from "react";
import { PromptInputGroup } from "@/components/library/common";

export default function RichText({
  text,
  setText,
}: {
  text?: string;
  setText: (
    state: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}) {
  const [model, setModel] = useState(text);

  const handleModelChange = (event: string) => {
    setModel(event);
    setText(event);
  };
  let config = {
    charCounterCount: false,
    key: "AVB8B-21B4C3A2E1D2D1A17vC2ve1xhbH1qb1vC2wgheC3I3C7C8C4B4B3A3B2G2==",
    placeholderText: "Enter description",
    toolbarButtons: {
      moreParagraph: {
        buttons: [
          "formatOL",
          "formatUL",
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
          "paragraphFormat",
          "paragraphStyle",
          "outdent",
          "indent",
          "quote",
        ],
        align: "left",
        buttonsVisible: 3,
      },
      moreText: {
        buttons: [
          "bold",
          "textColor",
          "fontSize",
          "italic",
          "underline",
          "fontFamily",
          "backgroundColor",
          "strikeThrough",
          "subscript",
          "superscript",
          "inlineClass",
          "inlineStyle",
          "clearFormatting",
        ],
        align: "left",
        buttonsVisible: 3,
      },
      //   moreRich: {
      //     buttons: [
      //       "insertLink",
      //       "insertImage",
      //       "insertVideo",
      //       "embedly",
      //       "insertTable",
      //       "emoticons",
      //       "fontAwesome",
      //       "specialCharacters",
      //       "insertHR",
      //     ],
      //     align: "left",
      //     buttonsVisible: 0,
      //   },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "insertImage",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
          "help",
        ],
        align: "right",
        buttonsVisible: 1,
      },
    },
    events: {
      contentChanged: function () {},
    },
  };
  return (
    <PromptInputGroup>
      <FroalaEditorComponent
        tag="textarea"
        model={model}
        config={config}
        onModelChange={handleModelChange}
      />
    </PromptInputGroup>
  );
}
