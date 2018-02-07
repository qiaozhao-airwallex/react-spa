import React, { Component } from 'react';
import './Stuff.css'

export default class StuffListContainer extends Component {
    render() {
        return (
            <div className="item-container">
                <a href={"my-stuff/" + this.props.id}
                   className="item-con">
                    <div className="img-wraper">
                        <img alt={this.props.subject} src={this.props.image} />
                    </div>
                    <div className="item-subject">{this.props.subject}</div>
                </a>
            </div>
        );
    }
}