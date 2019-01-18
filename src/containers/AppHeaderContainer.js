import AppHeader from "../views/appHeader/AppHeader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setImageName } from "../actions/appHeaderActions";

const mapStateToProps = (state, ownProps) => ({
  authenticated: state.loginReducer.authenticated,
  imageName: state.appHeaderReducer.imageName,
  uploadModalVisible: state.appHeaderReducer.uploadModalVisible
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onImageNameInputChange: e => {
    dispatch(setImageName(e.target.value));
  }
});

AppHeader.contextTypes = {
  store: PropTypes.object
};

const AppHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader);

export default AppHeaderContainer;
