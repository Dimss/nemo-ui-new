import React from "react";
import { Icon, Card, Divider, Modal, Button, Input } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";
import {
  loadFeed,
  addLike,
  setCurrentImageId,
  setCommentModalVisible,
  setComment,
  addComment,
  deleteImage
} from "../../actions/feedActions";
const { TextArea } = Input;
const { Meta } = Card;
export default class Feed extends React.Component {
  componentWillMount() {
    this.context.store.dispatch(loadFeed());
  }

  onLikeClick = el => {
    console.log(el);
  };
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <div style={{ marginTop: "30px" }}>
                {this.props.feed.map((el, idx) => (
                  <Card
                    key={idx}
                    style={{ width: 500, marginTop: "10px" }}
                    cover={
                      <img alt={el.title} src={"http://receiver/" + el.link} />
                    }
                    actions={[
                      <div>
                        <Icon
                          key={el._id}
                          type="like"
                          theme="twoTone"
                          twoToneColor="#eb2f96"
                          onClick={() => {
                            this.context.store.dispatch(addLike(el._id));
                          }}
                        />
                        <span> {el.likes}</span>
                      </div>,
                      <Icon
                        type="form"
                        onClick={() => {
                          this.context.store.dispatch(
                            setCurrentImageId(el._id)
                          );
                          this.context.store.dispatch(setComment(""));
                          this.context.store.dispatch(
                            setCommentModalVisible(true)
                          );
                        }}
                      />,
                      <Icon
                        type="delete"
                        onClick={() => {
                          this.context.store.dispatch(
                            setCurrentImageId(el._id)
                          );
                          this.context.store.dispatch(deleteImage());
                        }}
                      />
                    ]}
                  >
                    <Meta title={el.title} description="" />
                    <Divider orientation="left">
                      Comments <Icon type="team" theme="outlined" />
                    </Divider>
                    {el.comments.map((comment, index) => (
                      <div key={index}>
                        <p style={{ textAlign: "left" }}>{comment.comment}</p>
                        ...
                      </div>
                    ))}
                  </Card>
                ))}
                <Modal
                  title={"Add comment"}
                  visible={this.props.commentModalVisible}
                  onCancel={() => {
                    this.context.store.dispatch(setCommentModalVisible(false));
                  }}
                  footer={[
                    <Button
                      key="upload"
                      type="primary"
                      onClick={() => {
                        this.context.store.dispatch(addComment());
                        this.context.store.dispatch(
                          setCommentModalVisible(false)
                        );
                      }}
                    >
                      Add comment
                    </Button>,
                    <Button
                      key="cancel"
                      onClick={() => {
                        this.context.store.dispatch(
                          setCommentModalVisible(false)
                        );
                      }}
                    >
                      Cancel
                    </Button>
                  ]}
                >
                  <div>
                    <Row>
                      <Col md={2}>
                        <p>Comment </p>
                      </Col>
                      <Col md={10}>
                        <TextArea
                          onChange={this.props.onCommentInputChange}
                          value={this.props.comment}
                          rows={4}
                        />
                      </Col>
                    </Row>
                  </div>
                </Modal>
              </div>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
