import React, {useEffect, useState} from "react";
import {Col, message, Row, Spin} from "antd";
import PlanBoard from "../components/PlanBoard";
import {useLocation, useNavigate} from "react-router-dom";
import TravelMap from "../components/TravelMap";

function PlanPage() {

    const navigate = useNavigate();
    const urlLocation = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let city = JSON.parse(localStorage.getItem('center') === null ? 'null' : localStorage.getItem('center'));
        if (city === null) {
            message.error('Choose A CITY First!!!')
            navigate('/search');
        }
    }, [])

    function setPageStatus(flag) {
        setLoading(flag);
    }

    return (
        <>
            <Spin spinning={loading}>
                <Row
                    justify="space-around"
                    style={{ height: "820px" }}>
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