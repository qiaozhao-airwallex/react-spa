import React, { Component } from 'react';
import StuffListContainer from './StuffListContainer';
import {productBackendURL} from '../Config/Config'
import {getImageURL} from '../Image/ImageHelper'
import {httpRequestWithToken} from '../Utils/HttpWrapper';

export default class MyStuffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stuffList: []
        }
    }

    componentDidMount() {
        let urlParam='?category=unknown'
        if (this.props.match.path === '/my-published' || this.props.match.path === '/') {
            urlParam = '?category=published'
        } else if (this.props.match.path === '/my-unPublished') {
            urlParam = '?category=unPublished'
        }

        httpRequestWithToken({
            url: productBackendURL + urlParam,
        }, (response) => {
            this.setState({
                stuffList: response.data
            });
        })
    }
    
    render() {
        return (
            <div>
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
