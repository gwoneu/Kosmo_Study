import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import ModalPost from '../user/ModalPost';

const OrderPage = ({list, checkSum}) => {
    const [form, setForm] = useState('');
    const {uid, uname, phone, address1, address2} = form;

    const getUser = async () => {
        const res = await axios.get(`/user/read?uid=${sessionStorage.getItem("uid")}`);
        setForm(res.data);
    }

    useEffect(()=>{
        getUser();
    },[]);

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const onPostCode = (address) => {
        setForm({
            ...form,
            address1: address
        });
    }

    const onOrder = async () => {
        if(window.confirm("위 상품들을 주문하시겠습니까?")){
            const orders = list.filter(s=>s.checked);
            //console.log(orders);
            const res = await axios.post("/purchase/insert", {...form, sum:checkSum, orders});
            //장바구니 비우기
            for(const order of orders){
                await axios.post(`/cart/delete/${order.cid}`);
            }
            window.location.href=`/order/complete/${res.data}`;
        }
    }

    return (
        <div className='my-5'>
            <h1 className='title'>주문하기</h1>
            <Table hover bordered className='tablegroup'>
                <thead>
                    <tr>
                        <th colSpan={3}>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=>s.checked &&
                        <tr>
                            <td><img src={`/display?file=${s.image}`} width='50'/></td>
                            <td>{s.cid}</td>
                            <td>{s.title}</td>
                            <td>{s.fmtprice}</td>
                            <td>{s.qnt}</td>
                            <td>{s.fmtsum}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert className='cart_alert text-center' variant='secondary'>
                <span> 주문총액 : <strong>{checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</strong></span>
            </Alert>
            <div className='my-5'>
                <h1 className='title'>주문자정보</h1>
                <div>
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <form>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text className='label'>아이디</InputGroup.Text>
                                    <Form.Control name='uid' value={uid} readOnly/>
                                </InputGroup>

                                <InputGroup className='mb-2'>
                                    <InputGroup.Text className='label'>회원명</InputGroup.Text>
                                    <Form.Control name='uname' onChange={onChangeForm} value={uname}/>
                                </InputGroup>

                                <InputGroup className='mb-2'>
                                    <InputGroup.Text className='label'>전화</InputGroup.Text>
                                    <Form.Control name='phone' onChange={onChangeForm} value={phone}/>
                                </InputGroup>

                                <InputGroup className='mb-2'>
                                    <InputGroup.Text className='label'>주소</InputGroup.Text>
                                    <Form.Control name='address1' value={address1} readOnly/>
                                    <ModalPost onPostCode={onPostCode}/>
                                </InputGroup>
                                <Form.Control name='address2'onChange={onChangeForm} value={address2} placeholder='상세주소'/>
                            </form>
                            <div className='text-center mt-4'>
                                <Button variant='dark btn-sm px-4' onClick={onOrder}>주문하기</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default OrderPage