import React, {useState} from "react";
import {Col, Row, Spin} from "antd";
import PlanBoard from "../components/PlanBoard";
import {useLocation} from "react-router-dom";
import TravelMap from "../components/TravelMap";

function PlanPage() {

    const urlLocation = useLocation();
    const [loading, setLoading] = useState(false);

    function setPageStatus(flag) {
        setLoading(flag);
    }

    return (
        <>
            <Spin spinning={loading}>
                <Row
                    justify="space-around"
                    style={{ height: "920px" }}>
                    <Col span={12}>
                        <PlanBoard
                            setPageStatus={setPageStatus}
                            days={urlLocation.state !== null ? urlLocation.state.days : 5}
                            startDate={urlLocation.state !== null ? urlLocation.state.startDate : '2022-05-01'}
                            endDate={urlLocation.state !== null ? urlLocation.state.endDate : '2022-05-05'}
                        />
                    </Col>
                    <Col span={12}>
                        <TravelMap />
                    </Col>
                </Row>
            </Spin>
        </>
    );

}

export default PlanPage;