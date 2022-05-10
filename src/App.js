import React from 'react';
import { Input } from 'antd';

class App extends React.Component {
  state = {

  }
  render = () => (
    <div id='InputContainer'>
      <img src="BIGSMART.jpg" alt='One Big Smart!' style={{padding: 30}}></img>
      <Input placeholder="Search For Your Favorite City!" size='large'/>
    </div>


    
    
  )
}

export default App;
