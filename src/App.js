import React from 'react';
import { Input, Button  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class App extends React.Component {
  state = {
    inputValue: ''
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  searchCity = () => {
    
  }


  render = () => (
    <div>
      <img 
        src="BIGSMART.jpg" 
        alt='One Big Smart!' 
        style={{padding: 30, display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "5%"}}
      ></img>
      <Input 
        prefix={<SearchOutlined />}
        placeholder="Search For Your Favorite City!" 
        size='large'
        maxLength={50}
        style={{ width: "30%", left: "32.5%"}}
        onChange={this.updateInputValue}
        onPressEnter={this.searchCity}
      ></Input>
      <Button
        type = "primary" 
        size = 'large'
        style = {{ width: "5%", left: "32.5%"}}
        OnClick = {this.searchCity}
      >Search</Button>
    </div>
  )

  
}

export default App;
