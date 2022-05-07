import React from "react";
import Avatar from "react-avatar-edit";
import { Grid, } from '@material-ui/core';

class AvatarForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: null,
      src: "https://pbs.twimg.com/media/EqB8qn1UcAIeSFq.jpg"
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
    console.log(preview);
  }

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 91680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  render() {
    console.log(this.state.src);
    return (
        <Grid container style={{"margin":"40px", "padding-left":"180px"}}>
            <Avatar
                width={390}
                height={295}
                onCrop={this.onCrop}
                onClose={this.onClose}
                onBeforeFileLoad={this.onBeforeFileLoad}
                src={this.state.src}
                onImageLoad={this.onImageLoad}
                //crossOrigin="anonymous"
                />
            <img src={this.state.preview} alt="Preview" style={{"width":"290px", "margin-left":"80px"}}/>
        </Grid>
    );
  }
}

export default AvatarForm;
