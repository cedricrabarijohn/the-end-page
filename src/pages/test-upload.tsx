import React from 'react'
import axios from 'axios';
import Image from 'next/image';

class SimpleReactFileUpload extends React.Component {

  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  // @ts-ignore
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    // @ts-ignore
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    })
  }
  // @ts-ignore
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  // @ts-ignore
  fileUpload(file) {
    const url = '/api/test-upload';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    // @ts-ignore
    return axios.post(url, formData, config)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    )
  }
}



export default SimpleReactFileUpload