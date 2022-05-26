import React from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

function SavePlanSuccessPage() {

    const navigate = useNavigate();

    return (
        <>
            <Result
                status="success"
                title="Congratulations! Successfully Saved Your Plan!"
                extra={[
                    <Button type="primary" onClick={() => {
                        navigate('/search');
                    }}>
                        Back to Search Page.
                    </Button>
                ]}
            />
        </>
    );
}

export default SavePlanSuccessPage;