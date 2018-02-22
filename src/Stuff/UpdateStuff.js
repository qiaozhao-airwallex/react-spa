import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MultipleImageUpload from '../Image/MultipleImageUpload'
import {productBackendURL} from '../Config/Config'
import {populateImagePreviewUrl} from '../Image/ImageHelper'
import {httpRequestWithToken} from "../Utils/HttpWrapper";

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
        httpRequestWithToken({
            url: productBackendURL + "/" + this.props.match.params.id,
        }, (response) => {
                const payload = this.state.payload;
                payload["imageList"] = response.data.imageList;
                this.setState({
                    id: response.data.id,
                    subject: response.data.subject,
                    description: response.data.description,
                    imageList: response.data.imageList.map((item, i) => {
                        return populateImagePreviewUrl(item);
                    }),
                    payload: payload,
                    published: response.data.published,
                });

            })
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
            this.saveToServer(() => {
                this.props.history.push('/my-stuff/' + this.state.id);
            });
        });
    }

    handleDiscard = (e) => {
        this.setState({
            published: false,
            changeSaved: false,
        }, () => {
            this.props.history.push('/my-stuff/' + this.state.id);
        });
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
            this.saveToServer(() => {
                this.props.history.push('/my-stuff/' + this.state.id);
            });
        });
    }

    saveToServer = (callback) => {
        let payload = this.state.payload;

        httpRequestWithToken({
            method: 'put',
            url: productBackendURL + "/" + this.state.id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(payload)
        }, (response) => {
            alert("Object updated successfully")
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