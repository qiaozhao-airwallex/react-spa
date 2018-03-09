import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

export default class FriendItem extends Component {

    render() {
        return (
            <div>
                <Link to ={'/my-friends/' + this.props.id + '/products/'}>
                    {this.props.name}
                </Link>
            </div>
        );
    }
}
