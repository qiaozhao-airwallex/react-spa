import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MultipleImageUpload from '../Image/MultipleImageUpload'
import {productBackendURL} from '../Config/Config'
import {populateImagePreviewUrl} from '../Image/ImageHelper'

export default class UpdateStuff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            subject: '',
            description: '',
            imageList: [],
            published: null,
            changeSaved: false,
            payload: {},
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
                    imageList: data.imageList.map((item, i) => {
                        return populateImagePreviewUrl(item);
                    }),
                    published: data.published,
                });

            })
            .catch((error) => {
                console.log(error)
            });

    }

    updateImageListCallback = (imageList) => {
        const payload = this.state.payload;
        payload["imageList"] = imageList;
        this.setState({
            imageList: imageList,
            payload: payload,
        });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        const payload = this.state.payload;
        payload[e.target.name] = e.target.value;
        state[payload] = payload;
        this.setState(state);
    }

    handleSaveForLater = (e) => {
        this.setState({
            published: false,
            changeSaved: true,
        }, function() {
            this.saveToServer();
        });
        window.location = '/my-stuff/' + this.state.id;
    }

    handleDiscard = (e) => {
        this.setState({
            published: false,
            changeSaved: false,
        });
        window.location = '/my-stuff/' + this.state.id;
    }

    handlePublish = (e) => {
        e.preventDefault();
        const payload = this.state.payload;
        payload["published"] = true;
        this.setState({
            published: true,
            payload: payload,
            changeSaved: true,
        }, function() {
            this.saveToServer();
        });
        window.location = '/my-stuff/' + this.state.id;
    }

    saveToServer = () => {
        let payload = this.state.payload;

        fetch(productBackendURL + "/" + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    console.log("Update successful");
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({
            payload: {}
        })
    }

    render() {
        return (
            <div>
                <Form className="col-6">
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="text" name="subject" id="subject" value={this.state.subject} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" value={this.state.description || ''} onChange={this.onChange} />
                    </FormGroup>
                    <MultipleImageUpload imageList={this.state.imageList}
                                         setImageList={this.updateImageListCallback}
                                         changeSaved={this.state.changeSaved} />
                    <Button color="primary" onClick={this.handlePublish}>Publish</Button>{' '}
                    <Button color="info" onClick={this.handleSaveForLater}>Save for later</Button>{' '}
                    <Button color="danger" onClick={this.handleDiscard}>Discard</Button>{' '}
                </Form>
            </div>
        );
    }
}