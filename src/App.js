import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state={
    imgURL:''
  }
  handleChange = (event) => {
    const file = event.target.files[0]//拿到文件路径和文件名
    const reader = new FileReader()//文件读取工具
    //
    reader.onload = (event) => {//进程挂起，文件加载完成时进行（也就是完全进入内存）
      console.log(event.target.result)
      let data = {
        file: event.target.result
      }

      //  数据挂到 form 上才能发送
      let formData = new FormData()
      formData.append('avatar', file)
      // 这样，可以保证 multipart/form-data 


      axios.post(`http://192.168.0.119:3008/touxiang`, formData).then(
        res=> {
        console.log('文件路径：',`http://192.168.0.119:3008/uploads/avatars/${res.data.filename}`)
         let fullImgUrl = `http://192.168.0.119:3008/uploads/avatars/${res.data.filename}`
        this.setState({
          imgURL:fullImgUrl
        })
        }
      )
      // 只有在这里，执行 file 相关操作，那么 file 里面才是有真正数据的
    }
    reader.readAsDataURL(file)//把图片信息往内存里面放
    console.log('hello...', file)
  }
  render() {
    return (
      <div className="App">
      <img src={this.state.imgURL} alt="avator"/>
        <input type="file" onChange={this.handleChange}
          className="file-upload-input" />
      </div>
    );
  }
}

export default App;
