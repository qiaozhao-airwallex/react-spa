import React, { Component } from 'react';
import {productBackendURL} from '../Config/Config'
import {getImageURL} from '../Image/ImageHelper'
import './Stuff.css'
import { Button } from 'reactstrap';
import {httpRequestWithToken} from "../Utils/HttpWrapper";
import {authentication} from "../Utils/Authentication";

export default class MyStuffItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            subject: null,
            description: null,
            imageList: [],
            published: null,
            owner: {
                id: null,
                username: null
            },
        }
    }

    componentDidMount() {
        httpRequestWithToken({
            url: productBackendURL + "/" + this.props.match.params.id,
        }, (response) => {
            this.setState({
                id: response.data.id,
                subject: response.data.subject,
                description: response.data.description,
                imageList: response.data.imageList,
                published: response.data.published,
                owner: response.data.owner
            })
        })
    }

    handleEdit = () => {
        this.props.history.push('/update-stuff/' + this.state.id);
    }
    
    render() {
        let $published = null;
        if (this.state.published) {
            $published = "Published";
        } else {
            $published = "Still a Draft";
        }
        let $editButton = null;
        if (authentication.getAuthUser() === this.state.owner.username) {
            $editButton = (<Button color="primary" onClick={this.handleEdit}>Edit</Button>)
        }
        return (
            <div className="col-6">
                <h5>
                    Owner: {this.state.owner.username}
                </h5>
                <dl className="dl-horizontal">
                    <dt>Subject</dt>
                    <dd>{this.state.subject}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Description</dt>
                    <dd>{this.state.description}</dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Images</dt>
                    <div className="imgPreviewComponent">
                        {this.state.imageList.map((item, i) => {
                            return (
                                <div key={i} className="imgPreviewContainer">
                                    <img className="imgPreview" alt="preview" src={getImageURL(item.targetFileName)}/>
                                </div>
                            )
                        })}
                        </div>
                </dl>
                <dl className="dl-horizontal">
                    <dt>State</dt>
                    <dd>{$published}</dd>
                </dl>
                {$editButton}
            </div>
        );
    }
}