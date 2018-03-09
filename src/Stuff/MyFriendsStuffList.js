import React, { Component } from 'react';
import StuffListContainer from './StuffListContainer';
import {productBackendURL} from '../Config/Config'
import {getImageURL} from '../Image/ImageHelper'
import {httpRequestWithTokenAndPathVar} from '../Utils/HttpWrapper';

export default class MyFriendsStuffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stuffList: [],
            currentFriend: null,
        }
    }

    componentDidMount() {
        this.loadFriendProducts(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.loadFriendProducts(nextProps.match.params.id);
    }

    loadFriendProducts = (userId) => {
        if (this.state.currentFriend === userId) {
            return;
        }
        let urlParam='?userId={userId}'
        httpRequestWithTokenAndPathVar({
            url: productBackendURL + urlParam,
        }, {
            userId: userId
        }, (response) => {
            this.setState({
                stuffList: response.data,
                currentFriend: userId
            });
        })
    }

    render() {
        return (
            <div>
                <h1>This is {this.state.currentFriend} garage</h1>
                <div className="item-list">
                        {this.state.stuffList.map((item, i) => {
                            var $imgAbsolutURL = null;
                            if (item.imageList != null && item.imageList.length > 0) {
                                $imgAbsolutURL = getImageURL(item.imageList[0].targetFileName);
                            }
                            return <StuffListContainer
                                key={item.id}
                                id={item.id}
                                subject={item.subject}
                                image={$imgAbsolutURL}
                            />
                        })}
                </div>
            </div>
        );
    }
}
