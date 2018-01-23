import React from 'react';
import ImagePreviewDisplay from './ImagePreviewDisplay'
import './Image.css'

const backendURL = "http://localhost:8080/image/"

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imageList: [
                {
                    imagePreviewUrl: '1a32e70d-3ffe-45dc-9bbc-fd536bda5606.webp'
                },
                {
                    imagePreviewUrl: '34c75271-9f6b-4ec4-94e7-eea8eab22a47.webp'
                },
            ]
        };
    }

    uploadImageToServer(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        fetch(backendURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    imageList: this.state.imageList.concat([
                        {
                            imagePreviewUrl: data.targetFileName
                        }
                    ])
                });
            })
            .catch((error) => {
                console.log(error)
            });

    }

    render() {
        return (
            <div className="imgPreviewComponent">
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this.uploadImageToServer(e)} />
                <ImagePreviewDisplay imageList={this.state.imageList}/>
            </div>
        )
    }
}