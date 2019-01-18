import Feed from "../views/feed/Feed";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setComment } from "../actions/feedActions";

const mapStateToProps = (state, ownProps) => ({
  feed: state.feedReducer.feed,
  currentImageId: state.feedReducer.currentImageId,
  comment: state.feedReducer.comment,
  commentModalVisible: state.feedReducer.commentModalVisible
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCommentInputChange: e => {
    dispatch(setComment(e.target.value));
  }
});

Feed.contextTypes = {
  store: PropTypes.object
};

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default FeedContainer;
