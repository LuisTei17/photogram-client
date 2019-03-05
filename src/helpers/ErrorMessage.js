import React, { Component } from 'react'

class ErrorMessage extends Component {
    render() {
        if (this.props.showError) {

            return (
                <div>
                    <h1>{this.props.message} </h1>
                </div>
            );
        }
        return null;
    }
}

export default ErrorMessage;