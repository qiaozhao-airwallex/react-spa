import React, { Component } from 'react';

export default class FriendItem extends Component {

    render() {
        return (
            <div>
                {this.props.userName}
            </div>
        );
    }
}
