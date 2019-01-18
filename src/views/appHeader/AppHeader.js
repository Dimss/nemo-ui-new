import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { push } from "react-router-redux";
import { notification } from "antd";
import { Layout, Menu, Icon, Dropdown, Button, Modal, Input } from "antd";
import { loadUserIdentity, logout } from "../../actions/loginActions";
import ApiClient from "../../api/APIClient";
import { setUploadModalVisible } from "../../actions/appHeaderActions";
import { loadFeed } from "../../actions/feedActions";

const { Header } = Layout;
export default class AppHeader extends React.Component {
  getMenu = () => (
    <Menu>
      <Menu.Item>
        <div
          onClick={() => {
            this.context.store.dispatch(logout());
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <Icon type="logout" theme="outlined" />
          </span>
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );
  componentWillMount = () => {
    this.context.store.dispatch(loadUserIdentity());
  };
  authView = () => {
    return (
      <div style={{ fontSize: "17px", color: "#ffffff" }}>
        <span style={{ color: "orange" }}>
          <Icon type="user" theme="outlined" />{" "}
        </span>
        <Dropdown overlay={this.getMenu()}>
          <span>
            <span> user@user.com</span> <Icon type="down" />
          </span>
        </Dropdown>
        <span style={{ marginLeft: "10px" }}>
          <Button
            size="large"
            ghost
            onClick={() => {
              console.log("asdasdasd");
              this.context.store.dispatch(setUploadModalVisible(true));
            }}
          >
            <span style={{ color: "orange", fontWeight: "bold" }}>Upload</span>
          </Button>
        </span>
      </div>
    );
  };

  notAuthView = () => {
    return (
      <div>
        <Button
          size="large"
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => {
            this.context.store.dispatch(push("/login"));
          }}
        >
          <span style={{ fontWeight: "bold" }}>Login</span>
        </Button>
        <Button
          size="large"
          ghost
          onClick={() => {
            this.context.store.dispatch(push("/signup"));
          }}
        >
          <span style={{ color: "orange", fontWeight: "bold" }}>Singup</span>
        </Button>
      </div>
    );
  };

  handleUpload = async () => {
    if (this.uploadInput) {
      var data = new FormData();
      data.append("file", this.uploadInput.files[0]);
      data.append("fileTitle", this.props.imageName);

      let err, resData;
      // Exec API call
      [err, resData] = await new ApiClient().uploadImage(data);
      if (err) {
        notification.error({
          message: "Error druing uploading, try again. . .",
          description: err.message
        });
      } else {
        this.context.store.dispatch(setUploadModalVisible(false));
        notification.success({
          message: `Files [ ${
            resData.data.fileName
          } ] has been succefully uploaded`
        });
        this.context.store.dispatch(loadFeed());
      }
    }
  };

  render() {
    return (
      <Header>
        <div />
        <Menu />
        <Grid fluid>
          <Row>
            <Col xs={8}>
              <Row center="md">
                <div style={{ fontSize: "50px", color: "#ffffff" }}>
                  macrogram
                  <span style={{ color: "orange" }}>
                    <Icon type="camera" />
                  </span>
                </div>
              </Row>
            </Col>
            <Col xs={4}>
              <Row center="sm">
                <div style={{ fontSize: "17px", color: "#ffffff" }}>
                  {this.props.authenticated === true
                    ? this.authView()
                    : this.notAuthView()}
                </div>
              </Row>
            </Col>
          </Row>
          <Modal
            title={"Upload new image"}
            visible={this.props.uploadModalVisible}
            onCancel={() => {
              this.context.store.dispatch(setUploadModalVisible(false));
            }}
            footer={[
              <Button
                key="upload"
                type="primary"
                onClick={() => {
                  this.handleUpload();
                }}
              >
                Upload
              </Button>,
              <Button
                key="cancel"
                onClick={() => {
                  this.context.store.dispatch(setUploadModalVisible(false));
                }}
              >
                Cancel
              </Button>
            ]}
          >
            <div>
              <Row>
                <Col md={2}>
                  <p>Title </p>
                </Col>
                <Col md={10}>
                  <Input
                    onChange={this.props.onImageNameInputChange}
                    value={this.props.imageName}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <br />
                  {/* <Button type="primary" block ghost>
                    Browse...
                  </Button>  */}
                  <div>
                    <form>
                      <div className="form-group">
                        <input
                          className="form-control"
                          ref={uploadInput => (this.uploadInput = uploadInput)}
                          // ref={ref => {
                          //   this.uploadInput = ref;
                          // }}
                          type="file"
                        />
                      </div>
                    </form>
                  </div>
                </Col>
              </Row>
            </div>
          </Modal>
        </Grid>
      </Header>
    );
  }
}
