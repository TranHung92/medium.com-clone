import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'medium-clone';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mrhubo/upload';

const seedFile = 'blob:http://localhost:3000/b6d04f9b-59d9-44c4-a69e-75f2b878203a'

export default class Draft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onSeed() {
    console.log('seeding')
    this.handleImageUpload(seedFile)
  }

  onImageDrop(files) {
    console.log('files', files)
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }



  render() {
    console.log('state', this.state)
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img alt='' src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
        <button onClick={this.onSeed.bind(this)}>submit</button>
      </form>
    )
  }
}