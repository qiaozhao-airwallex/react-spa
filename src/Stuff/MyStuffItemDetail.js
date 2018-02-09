import React, { Component } from 'react';
import {productBackendURL} from '../Config/Config'
import {getImageURL} from '../Image/ImageHelper'
import './Stuff.css'
import { Button, Form } from 'reactstrap';

export default class MyStuffItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            subject: null,
            description: null,
            imageList: [],
            published: null
        }
    }

    componentDidMount() {
        fetch(productBackendURL + "/" + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    id: data.id,
                    subject: data.subject,
                    description: data.description,
                    imageList: data.imageList,
                    published: data.published,
                });

            })
            .catch((error) => {
                console.log(error)
            });

    }

    handleEdit = () => {
        window.location = '/update-stuff/' + this.state.id;
    }
    
    render() {
        let $published = null;
        if (this.state.published) {
            $published = "Published";
        } else {
            $published = "Still a Draft";
        }
        return (
            <Form className="col-6">
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
                <Button color="primary" onClick={this.handleEdit}>Edit</Button>{' '}
            </Form>
        );
    }
}