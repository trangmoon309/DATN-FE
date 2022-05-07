import { useState } from "react";
import { RMIUploader } from "react-multiple-image-uploader";

const dataSources = [];

function UploadFile() {
  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  return (
    <div>
      <RMIUploader
      isOpen={visible}
      hideModal={hideModal}
      onSelect={onSelect}
      onUpload={onUpload}
      onRemove={onRemove}
      dataSources={dataSources}
      />
    </div>
  );
}

export default UploadFile;
