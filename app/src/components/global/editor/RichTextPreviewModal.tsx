import React, { useMemo } from "react";
import { StyledFlex } from "@/styles/globalElements";
import InfoModal from "@/components/modal/InfoModal/InfoModal";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

interface IProps {
  showRichTextPreviewModal: boolean;
  setShowRichTextPreviewModal: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
  richText: string;
}

const RichTextPreviewModal: React.FC<IProps> = ({
  showRichTextPreviewModal,
  setShowRichTextPreviewModal,
  richText,
}) => {
  return (
    <InfoModal
      headerTitle="Preview Description"
      onSubmit={() => {}}
      showModal={showRichTextPreviewModal}
      setShowModal={setShowRichTextPreviewModal}
      modalWidth="90%"
      showFooter={false}
    >
      <FroalaEditorView model={richText} />
    </InfoModal>
  );
};

export default RichTextPreviewModal;
