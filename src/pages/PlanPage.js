import React from "react";
import {Col, Row} from "antd";
import PlanBoard from "../components/PlanBoard";
import {useLocation} from "react-router-dom";
import TravelMap from "../components/TravelMap";

function PlanPage() {

    const urlLocation = useLocation();

    return (
        <>
            <Row
                justify="space-around"
                style={{ height: "920px" }}>
                <Col span={12}>
                    <PlanBoard
                        days={urlLocation.state !== null ? urlLocation.state.days : 5}
                        startDate={urlLocation.state !== null ? urlLocation.state.startDate : '2022-04-29'}
                        endDate={urlLocation.state !== null ? urlLocation.state.endDate : '2022-05-29'}
                    />
                </Col>
                <Col span={12}>
                    <TravelMap />
                </Col>
            </Row>
        </>
    );

}

export default PlanPage;