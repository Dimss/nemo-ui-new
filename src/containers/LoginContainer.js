import Login from "../views/login/Login";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPassword, setEmail, execLogin } from "../actions/loginActions";

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications,
  authenticated: state.loginReducer.authenticated,
  email: state.loginReducer.email,
  password: state.loginReducer.password
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUsernameInputChange: e => {
    dispatch(setEmail(e.target.value));
  },
  onPasswordInputChange: e => {
    dispatch(setPassword(e.target.value));
  },
  onLoginClick: () => {
    dispatch(execLogin());
  }
});

Login.contextTypes = {
  store: PropTypes.object
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
