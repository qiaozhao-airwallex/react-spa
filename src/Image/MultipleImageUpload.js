import React from 'react';
import MultipleImagePreviewDisplay from './MultipleImagePreviewDisplay'
import './Image.css'
import {postImageToServer} from './ImageUploadHelper'
import {removeImageFromServer} from './ImageUploadHelper'

export default class MultipleImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tmpImagesAdded: [],
            tmpImagesRemoved: [],
            displayOrder: 0,
        }
    }

    componentWillUnmount() {
        if (!this.props.changeSaved) {
            this.state.tmpImagesAdded.map((item, i) => {
                return removeImageFromServer(item.id);
            });
        }
    }

    uploadImageToServer = (e) => {
        e.preventDefault();
        postImageToServer(e.target.files[0], (serverFileId, imagePreviewUrl) => {
            this.setState({
                tmpImagesAdded: this.state.tmpImagesAdded.concat({
                    id: serverFileId
                }),
                displayOrder: this.props.imageList.length > 0 ? this.props.imageList[this.props.imageList.length - 1].displayOrder + 1 : 1
            }, () => {
                var data = this.props.imageList;
                data.push({
                    id: serverFileId,
                    imagePreviewUrl: imagePreviewUrl,
                    displayOrder: this.state.displayOrder,
                })
                this.props.setImageList(data);
            })
        });
    }

    removeImageCallback = (image) => {
        var data = this.props.imageList;
        var index = data.indexOf(image);
        data.splice(index, 1);
        this.props.setImageList(data);

        this.setState({
            tmpImagesRemoved: this.state.tmpImagesRemoved.concat(image),
        })
    }

    render() {
        return (
            <div className="imgPreviewComponent">
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this.uploadImageToServer(e)} />
                <MultipleImagePreviewDisplay imageList={this.props.imageList} removeImage={this.removeImageCallback}/>
            </div>
        )
    }
}