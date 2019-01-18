import React from "react";
import { Input, Spin, Icon, Button, Form } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";
import "./Login.css";
import { setEmail } from "../../actions/signupActions";
import { setPassword } from "../../actions/loginActions";

const FormItem = Form.Item;

export default class Login extends React.Component {
  componentWillMount() {
    this.context.store.dispatch(setEmail(""));
    this.context.store.dispatch(setPassword(""));
  }
  render() {
    return (
      <Grid
        fluid
        onKeyDown={e => (e.key === "Enter" ? this.props.onLoginClick() : null)}
      >
        <Spin size={"large"} spinning={false}>
          <Row center="md">
            <Col md={3}>
              <h2 className="login-title">Login</h2>
              <Form onSubmit={this.props.onLoginClick}>
                <div style={{ marginBottom: "10px" }}>
                  <FormItem>
                    <Input
                      className="bg-input"
                      onChange={this.props.onUsernameInputChange}
                      value={this.props.email}
                      addonBefore={<Icon type="user" />}
                      size="large"
                      placeholder={"Email"}
                    />
                  </FormItem>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <FormItem>
                    <Input
                      className="bg-input"
                      onChange={this.props.onPasswordInputChange}
                      value={this.props.password}
                      type={"password"}
                      addonBefore={<Icon type="key" />}
                      size="large"
                      placeholder={"Password"}
                    />
                  </FormItem>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    className="bg-button"
                    onClick={this.props.onLoginClick}
                    style={{ width: "100%" }}
                    type="primary"
                    size={"large"}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Spin>
      </Grid>
    );
  }
}
