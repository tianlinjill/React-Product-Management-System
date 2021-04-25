import React, { Component } from 'react'
import { Icon,Upload, Modal, message } from 'antd'

export default class PicturesUpload extends Component {
   
    
    state = {
        previewVisible: false,  //flag photo preview
        previewImage: '', //photo's src
        fileList: [],
    };
 

    // invisiable photo preview
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
    console.log('handlePreview()', file)
    // 显示指定file对应的大图
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
    getImgs = () => {
        return this.state.fileList.map(file =>  file.name)
    }

    handleChange = ({ file, fileList }) => {
        if (file.status === 'done') {
            // get response from server
            const result = file.response
            if (result.status === 0) {
                //get response success
                message.success('Upload photo success!')
                //format the file
                const { name, url} = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                //faild to get response data
                message.error('Failed to Upload the photo!')
            }
        }
        this.setState({ fileList });

    }
       
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div >Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"
                    accept='image/*'
                    listType="picture-card"
                    name='image'
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
            
    }
}