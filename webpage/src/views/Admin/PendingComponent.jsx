import React, { Component } from 'react';
import axios from 'axios';

class PendingComponent extends Component {
  constructor(props) {
    super(props);


    this.aPackage = this.props.aPackage;
    this.download = this.download.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    console.log(this.aPackage.fileName);
  }

  updateStatus(e) {
    axios({
      method: 'post',
      url: `api/packages/${e.target.value}`,
      headers: { 'content-type': 'application/json' },
      data: {
        id: this.aPackage._id
      }
    }).then((res) => {
      if (res.status === 200) {
        console.log('res:', res);
        console.log('yo');
        this.props.reload();
      }
    });
  }

  download() {
    console.log(this.aPackage);
    axios({
      method: 'get',
      url: `api/packages/${this.aPackage.storedFileName}`,
      // data: {
      //   storedFileName: this.aPackage.storedFileName
      // }
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new File(
        [new Uint8Array(res.data)],
        this.aPackage.fileName));
        a.download = this.aPackage.fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  }

  render() {
    this.aPackage = this.props.aPackage;

    let divStyle = {
      width: 250,
      height: 250,
      border: "3px solid black",
      borderRadius: "5px",
      margin: "3px",
      paddingLeft: "3px",
      textAlign: "left",
    };

    return (
      <div style={divStyle}>
        <h3>Name: {this.aPackage.name}</h3>
        <p>Filename: {this.aPackage.fileName}</p>
        <a href={`http://localhost:5001/api/packages/${this.aPackage.fileId}/${this.aPackage.fileName}`}>
          <button>Download File</button>
        </a>
        <p>Pending:<input type="radio" value="reset" checked={this.aPackage.status === 'pending'} onClick={this.updateStatus}/></p>
        <p>Approved:<input type="radio" value="approve" checked={this.aPackage.status === 'approved'} onClick={this.updateStatus}/></p>
        <p>Rejected:<input type="radio" value="reject" checked={this.aPackage.status === 'reject'} onClick={this.updateStatus}/></p>
        {/* {this.aPackage.status === 'pending' ?
          <p>
            <button name='approve' onClick={this.updateStatus}>approve</button>
            <button name='reject' onClick={this.updateStatus}>reject</button>
          </p>
          :
          <button name='reset' onClick={this.updateStatus}>reset</button>
        } */}
      </div>
    );
  }
}

export default PendingComponent;
