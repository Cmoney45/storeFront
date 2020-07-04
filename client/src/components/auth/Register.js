import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Card from '@material-ui/core/Card';

const cardStyle = {
  width: 450,
  margin: "auto",
  marginTop: 30,
  padding: 30
}

class Register extends Component {

    constructor() {
        super();
        this.state = {
            userName: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        //Save the state as an object
        const newUser = {
            userName: this.state.userName,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);

        //Call the register user
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <Card
              style={cardStyle}
            >
            <div className="container">
                <div className="row">
                    <div className="col s8">
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.userName}
                                    error={errors.userName}
                                    id="userName"
                                    type="userName"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="userName">Username</label>
                                <span className="red-text">{errors.userName}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.first_name}
                                    error={errors.first_name}
                                    id="first_name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="first_name">First Name</label>
                                <span className="red-text">{errors.first_name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.last_name}
                                    error={errors.last_name}
                                    id="last_name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.last_name
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="last_name">Last Name</label>
                                <span className="red-text">{errors.last_name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="col s12" style={{ marginTop: "10px", paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        color: "white",
                                        backgroundColor: "#007bff",
                                        fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`
                                    }}
                                    type="submit"
                                    className="btn btn-large"
                                >Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </Card>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
