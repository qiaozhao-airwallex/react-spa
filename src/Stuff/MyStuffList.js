import React, { Component } from 'react';
import StuffListContainer from './StuffListContainer';
import {productBackendURL} from '../Config/Config'
import {getImageURL} from '../Image/ImageHelper'

export default class MyStuffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stuffList: []
        }
    }

    componentDidMount() {
        let urlParam='?category=unknown'
        if (this.props.match.path === '/my-published') {
            urlParam = '?category=published'
        } else if (this.props.match.path === '/my-unPublished') {
            urlParam = '?category=unPublished'
        }
        fetch(productBackendURL + urlParam, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(data => {
                console.log(data);
                this.setState({
                    stuffList: data
                });

            })
            .catch((error) => {
                console.log(error)
            });

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
