import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalOrder = ({p}) => {
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getOrders = async () => {
        const res = await axios(`/purchase/list.json/${p.oid}`);
        //console.log(res.data);
        setOrders(res.data);
    }

    useEffect(()=>{
        getOrders();
    },[]);

    return (
        <>
            <Button variant="dark btn-sm" onClick={handleShow}>
                상세보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>주문번호 : {p.oid}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className='p-3 mb-5'>
                        <Card.Body>
                            <div className='mb-2'>주문자 : {p.uname} ({p.uid})</div>
                            <div className='mb-2'>전화 : {p.phone}</div>
                            <div className='mb-2'>주소 : {p.address1} {p.address2}</div>
                            <div>총액 : {p.fmtsum}원</div>
                        </Card.Body>
                    </Card>
                    <h3 className='title my-4'>주문상품</h3>
                    <Table hover bordered className='tablegroup'>
                        <thead>
                            <tr>
                                <th colSpan={2}>상품명</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o=>
                                <tr key={o.pid}>
                                    <td><img src={`/display?file=${o.image}`} width="50"/></td>
                                    <td>[{o.pid}] {o.title}</td>
                                    <td>{o.fmtprice}</td>
                                    <td>{o.qnt}</td>
                                    <td>{o.fmtsum}원</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark btn-sm" onClick={handleClose}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalOrder