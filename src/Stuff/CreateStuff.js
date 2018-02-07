import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MultipleImageUpload from '../Image/MultipleImageUpload'
import SingleImageUpload from '../Image/SingleImageUpload'
import {productBackendURL} from '../Config/Config'

export default class CreateStuff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: null,
            description: null,
            mainImage: {
                originalFileName: null,
                targetFileName: null
            },
            otherImages: [],
            published: null
        }
    }

    setMainImageCallback = (mainImage) => {
        this.setState({
            mainImage: mainImage
        });
    }

    updateOtherImagesCallback = (otherImages) => {
        this.setState({
            otherImages: otherImages
        });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSaveForLater = (e) => {
        this.setState({
            published: false
        }, function() {
            this.saveToServer();
        });
    }

    handleDiscard = (e) => {
        alert("Discard")
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            published: true
        }, function() {
            this.saveToServer();
        });
    }

    saveToServer = () => {
        let payload = {
            subject: this.state.subject,
            description: this.state.description,
            mainImage: this.state.mainImage,
            otherImages: this.state.otherImages,
            published: this.state.published,
        };

        fetch(productBackendURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <div>
                <Form className="col-6">
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="text" name="subject" id="subject" placeholder="subject"  onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description"  onChange={this.onChange}/>
                    </FormGroup>
                    <SingleImageUpload image={this.state.mainImage} setImage={this.setMainImageCallback}/>
                    <MultipleImageUpload imageList={this.state.otherImages} setImageList={this.updateOtherImagesCallback}/>
                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
                    <Button color="info" onClick={this.handleSaveForLater}>Save for later</Button>{' '}
                    <Button color="danger" onClick={this.handleDiscard}>Discard</Button>{' '}
                </Form>
            </div>
        );
    }
}