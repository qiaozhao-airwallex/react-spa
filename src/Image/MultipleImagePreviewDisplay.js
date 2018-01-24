import React from 'react';

export default class MultipleImagePreviewDisplay extends React.Component {
    render() {
        return (
            <div className="imgPreviewComponent">
                {this.props.imageList.map((item, i) => {
                    return (
                    <div key={i} className="imgPreviewContainer">
                        <img className="imgPreview" alt="preview" src={item.imagePreviewUrl}/>
                    </div>
                    )
                })}
            </div>
        )
    }
}