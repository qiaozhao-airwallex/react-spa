import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MultipleImageUpload from '../Image/MultipleImageUpload'
import SingleImageUpload from '../Image/SingleImageUpload'
import {productBackendURL} from '../Config/Config'
import {populateImagePreviewUrl} from '../Image/ImageHelper'

export default class UpdateStuff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            subject: '',
            description: '',
            mainImage: {
                originalFileName: null,
                targetFileName: null
            },
            otherImages: [],
            published: null,
            toSave: false,
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
                    mainImage: populateImagePreviewUrl(data.mainImage),
                    otherImages: data.otherImages.map((item, i) => {
                        return populateImagePreviewUrl(item);
                    }),
                    published: data.published,
                });

            })
            .catch((error) => {
                console.log(error)
            });

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
            published: false,
            toSave: true,
        }, function() {
            this.saveToServer();
        });
    }

    handleDiscard = (e) => {
        alert("Discard")
        this.setState({
            published: false,
            toSave: false,
        }, function() {
            // this.saveToServer();
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            published: true,
            toSave: true,
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
                    <SingleImageUpload image={this.state.mainImage} setImage={this.setMainImageCallback}/>
                    <MultipleImageUpload imageList={this.state.otherImages}
                                         setImageList={this.updateOtherImagesCallback}
                                         toSave={this.state.toSave} />
                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
                    <Button color="info" onClick={this.handleSaveForLater}>Save for later</Button>{' '}
                    <Button color="danger" onClick={this.handleDiscard}>Discard</Button>{' '}
                </Form>
            </div>
        );
    }
}