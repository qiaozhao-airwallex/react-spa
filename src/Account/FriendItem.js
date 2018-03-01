import React, { Component } from 'react';

export default class FriendItem extends Component {

    render() {
        return (
            <div>
                Pic:{this.props.userName}
            </div>
        );
    }
}
