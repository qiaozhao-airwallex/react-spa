import React, { Component } from 'react';
import FriendItem from './FriendItem';
import {httpRequestWithToken} from "../Utils/HttpWrapper";
import {userBackendURL} from "../Config/Config";
import {authentication} from "../Utils/Authentication";
import {getImageURL} from "../Image/ImageHelper";

export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendLoaded: false,
            friendList: []
        }
    }

    reloadFriends = () => {
        httpRequestWithToken({
            url: userBackendURL + authentication.getAuthUserID(),
        }, (response) => {
            this.setState({
                friendList: response.data.friends,
                friendLoaded: true
            });
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (authentication.isAuthenticated() && !nextState.friendLoaded) {
            this.reloadFriends();
            return true;
        } else if (!authentication.isAuthenticated() && nextState.friendLoaded) {
            this.setState({
                friendList: [],
                friendLoaded: false
            });
            return true;
        }
        return true;
    }

    render() {
        if (!authentication.isAuthenticated()) {
            return null;
        }

        return (
            <div className="sideContent">
                {this.state.friendLoaded && this.state.friendList.map((item, i) => {
                    return <FriendItem userName={item.username}/>
                })}
            </div>
        );
    }
}
