import React, { Component } from 'react';
import './Stuff.css'

export default class StuffItemView extends Component {
    render() {
        return (
            <div className="item-container">
                <a href=""
                   className="item-con">
                    <div className="img-wraper">
                        <img alt={this.props.name} src={this.props.image} />
                    </div>
                    <div className="item-name">{this.props.name}</div>
                    <div className="price-sales">
                        <span className="price">${this.props.price}</span>
                    </div>
                </a>
            </div>
        );
    }
}