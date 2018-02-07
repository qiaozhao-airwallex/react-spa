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
            mainImage: null,
            otherImages: [],
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
                    mainImage: data.mainImage,
                    otherImages: data.otherImages,
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
        let $mainImagePreview = null;
        if (this.state.mainImage) {
            $mainImagePreview = (
                    <img className="imgPreview" alt="preview" src={getImageURL(this.state.mainImage.targetFileName)}/>
            )
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
                    <dt>Main Image</dt>
                    <dd>
                        <div className="imgPreviewComponent">
                            <div className="imgPreviewContainer">
                                {$mainImagePreview}
                            </div>
                        </div>
                    </dd>
                </dl>
                <dl className="dl-horizontal">
                    <dt>Other images</dt>
                    <div className="imgPreviewComponent">
                        {this.state.otherImages.map((item, i) => {
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