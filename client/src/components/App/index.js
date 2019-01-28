import React, { Component } from 'react';
import './style.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  // this is the rendered image
  // <img src={this.state.imageURL} alt="img" />

  render() {
    return (
      <div>
      <Navbar color="dark" dark  expand="md">
        <NavbarBrand href="/">Veritas</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="info" onClick={this.toggle}>+</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Upload Photo</ModalHeader>
                <ModalBody>
                  <form onSubmit={this.handleUploadImage}>
                    <div>
                      <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    </div>
                    <br />
                    <div>
                      <Button color="info">Upload</Button>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
            </NavItem>
          </Nav>
      </Navbar>

      <div></div>

      </div>
    );
  }
}

export default App;
