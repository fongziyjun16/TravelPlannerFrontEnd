import { Component } from 'react';
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";

class App extends Component {

  state = {

  }

  handleLoginSuccess = (token) => {

  }

  handleLogout = () => {

  }

  render() {
    return (
      <>
        <Layout style={{ height: "100vh" }}>
          <AppHeader handleLoginSuccess={this.handleLoginSuccess} handleLogout={this.handleLogout}/>
          <AppContent />
        </Layout>
      </>
    )
  }

}

export default App;
