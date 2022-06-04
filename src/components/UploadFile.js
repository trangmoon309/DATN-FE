import { useState } from "react";
import { RMIUploader } from "react-multiple-image-uploader";

function UploadFile(props) {
  const { images, setImages} = props;

  const [visible, setVisible] = useState(false);
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    let list = [];
    data.forEach((item) => list.push(item.file));
    setImages(list)
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
      dataSources={images}
      />
    </div>
  );
}

export default UploadFile;
