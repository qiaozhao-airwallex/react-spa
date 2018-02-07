import React from 'react';
import { Button } from 'reactstrap';

export default class MultipleImagePreviewDisplay extends React.Component {

    handleRemove = (item, e) => {
        e.preventDefault();
        this.props.removeImage(item);
    }

    render() {
        return (
            <div className="imgPreviewComponent">
                {this.props.imageList.map((item, i) => {
                    return (
                    <div key={i} className="imgPreviewContainer">
                        <img className="imgPreview" alt="preview" src={item.imagePreviewUrl}/>
                        <div className="imgRemove">
                            <Button outline color="danger" className="fa fa-trash" onClick={(e) => this.handleRemove(item, e)}></Button>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}