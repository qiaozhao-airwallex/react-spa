import React from 'react';
import './Image.css'
import {postImageToServer} from './ImageUploadHelper'

export default class SingleImageUpload extends React.Component {

    uploadImageToServer(e) {
        e.preventDefault();

        postImageToServer(e.target.files[0], (serverFileName, imagePreviewUrl) => {
            this.props.setImage({
                targetFileName: serverFileName,
                imagePreviewUrl: imagePreviewUrl
            })
        });
    }

    render() {
        let $imagePreview = null;
        if (this.props.image.imagePreviewUrl) {
            $imagePreview = (
                <div className="imgPreviewContainer">
                    <img className="imgPreview" alt="preview" src={this.props.image.imagePreviewUrl}/>
                </div>
                );
        } else {
            $imagePreview = (
                <div className="imgPreviewContainer">
                    <div className="previewText">Please select front image</div>
                </div>
            );
        }
        return (
            <div className="imgPreviewComponent">
                <input className="fileInput"
                       type="file"
                       onChange={(e)=>this.uploadImageToServer(e)} />
                <div className="imgPreviewComponent">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}