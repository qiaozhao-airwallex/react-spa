import React, { Component } from 'react';
import FriendItem from './FriendItem';

export default class FriendList extends Component {

    render() {
        return (
            <div>
                <FriendItem userName="abc"/>
                <FriendItem userName="abcdef"/>
                <FriendItem userName="abcdefdsfsd"/>
                <FriendItem userName="abcdefdsfsddfsf"/>
                <FriendItem userName="abc"/>
                <FriendItem userName="abcdefdsf"/>
                <FriendItem userName="abcdefdsfddd"/>
            </div>
        );
    }
}
