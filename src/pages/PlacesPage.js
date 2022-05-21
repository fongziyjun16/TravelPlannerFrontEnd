import { Component } from "react";
import {Button} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

class PlacesPage extends Component {

    state = {

    };

    handleContinue = () => {
        this.props.navigate('/days');
    }

    render() {
        return (
            <>
                <h1>This is places page</h1>
                <Button
                    typeof="primary"
                    shape="round"
                    size="large"
                    icon={<CheckCircleOutlined />}
                    onClick={this.handleContinue}>
                    Ready to build your own Travel Plan?
                </Button>
            </>
        )
    }
}

export default function (props) {
    const navigate = useNavigate();
    return <PlacesPage {...props} navigate={navigate} />
};