import Signup from "../views/signup/Signup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPassword, setEmail, signup } from "../actions/signupActions";

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications,
  email: state.singupReducer.email,
  password: state.singupReducer.password
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUsernameInputChange: e => {
    dispatch(setEmail(e.target.value));
  },
  onPasswordInputChange: e => {
    dispatch(setPassword(e.target.value));
  },
  onLoginClick: () => {
    dispatch(signup());
  }
});

Signup.contextTypes = {
  store: PropTypes.object
};

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default SignupContainer;
