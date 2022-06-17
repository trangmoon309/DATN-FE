import React, { useEffect, useState } from "react";
import "./avatarForm.css";
import { useRef } from "react";

export default function AvatarForm(props) {
  const { file, onChange, imagePreviewUrl} = props;
  const [imagePreview, setImagePreview] = useState(<div className="previewText">Please select an Image for Preview</div>);
  const inputElement = useRef(null);

  function onBtnClick(e){
    e.preventDefault();
    inputElement.current.click();
  };

  useEffect(() => {
    setImagePreview(<img src={imagePreviewUrl} />);
  },[imagePreviewUrl]);
  
  return (
    <div className="previewComponent">
      <div className="imgPreview">
        {imagePreview}
      </div>
      <form>
        <input 
            ref={inputElement}
            className="fileInput" 
            type="file" 
            onChange={(e) => onChange(e)} />
          <button 
            className="submitButton" 
            onClick={(e) => onBtnClick(e)}
            type='submit'
          >Upload Image
          </button>
      </form>
    </div>
  )
}