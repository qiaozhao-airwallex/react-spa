import React, { Component } from 'react';
import FriendItem from './FriendItem';
import {httpRequestWithToken} from "../Utils/HttpWrapper";
import {userBackendURL} from "../Config/Config";
import {authentication} from "../Utils/Authentication";

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

    componentDidMount() {
        if (authentication.isAuthenticated() && !this.state.friendLoaded) {
            this.reloadFriends();
        }
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
                    return <FriendItem key={item.id} name={item.name}/>
                })}
            </div>
        );
    }
}
