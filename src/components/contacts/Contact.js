import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  showOnClick = e => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };
  deleteOnClick = async (id, dispatch) => {
    try {
      await axios.delete("https://jsonplaceholder.typicode.com/users/" + id);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name.toUpperCase()}
                <i className="fas fa-chevron-down" onClick={this.showOnClick} />
                <i
                  className="fas fa-times"
                  onClick={this.deleteOnClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i className="fas fa-pencil-alt" />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email} </li>
                  <li className="list-group-item">Phone: {phone} </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
