import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";

const OrderComplete = () => {
    const {oid} = useParams();
    return (
        <Row className='justify-content-center'>
            <Col md={8}>
                <div className='text-center my-5 card p-5'>
                    <TiShoppingCart className='order_cart'/>
                    <h3 className='title'>주문이 완료되었습니다.</h3>
                    <h6>주문번호 : {oid}</h6>
                </div>
            </Col>
        </Row>
        
    )
}

export default OrderComplete