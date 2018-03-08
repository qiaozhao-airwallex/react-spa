import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import './Stuff.css'

export default class StuffListContainer extends Component {
    render() {
        return (
            <div className="item-con">
                <Link to ={'/my-stuff/' + this.props.id}>
                    <div className="img-wrapper">
                        <img alt={this.props.subject} src={this.props.image} />
                    </div>
                    <div className="item-subject">{this.props.subject}</div>
                </Link>
            </div>
        );
    }
}