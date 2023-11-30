import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from 'react-js-pagination';
import ModalOrder from '../order/ModalOrder';

const OrderList = () => {
    const [key, setKey] = useState('uid');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const size = 3;
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const getList = async () => {
        const res = await axios(`/purchase/admin/list.json?key=${key}&query=${query}&page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(()=>{
        getList();
    },[page]);

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getList();
    }

    const onChangeStatus = (e, oid) => {
        const data = list.map(p=>p.oid === oid ? {...p, status:e.target.value} : p);
        setList(data);
    }

    const onClickStatus = async (oid, status) => {
        await axios.post("/purchase/update/status", {oid,status});
        alert("주문상태 변경 완료.");
        getList();
    }

    const onChangeKey = (e) => {
        setQuery("");
        setKey(e.target.value);
    }

    return (
        <div className='my-5'>
            <h1 className='title'>주문관리</h1>
            <Row className='mb-4'>
                <Col md={5}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Select onChange={onChangeKey}>
                                <option value="oid">주문번호</option>
                                <option value="uname">주문자명</option>
                                <option value="uid">아이디</option>
                                <option value="address1">배송지</option>
                                <option value="phone">전화번호</option>
                                <option value="status">주문상태</option>
                            </Form.Select>
                            {key === 'status' ?
                                <Form.Select onChange={(e)=>setQuery(e.target.value)}>
                                <option value="">모든주문</option>
                                <option value="0">결제대기</option>
                                <option value="1">결제완료</option>
                                <option value="2">배송준비</option>
                                <option value="3">배송중</option>
                                <option value="4">배송완료</option>
                                <option value="5">구매확정</option>
                                </Form.Select>
                                :
                                <Form.Control placeholder='검색어' onChange={(e)=>setQuery(e.target.value)}/>
                            }
                            <Button type='submit' variant='dark btn-sm'>검색</Button>
                            <span className='mt-2 ms-4'>주문건수 : {total}</span>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table hover bordered className='tablegroup'>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>주문자명</th>
                        <th>배송지</th>
                        <th>전화번호</th>
                        <th>주문상품</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.oid}>
                            <td>{p.oid}</td>
                            <td>{p.uname}({p.uid})</td>
                            <td>{p.address1}</td>
                            <td>{p.phone}</td>
                            <td><ModalOrder p={p}/></td>
                            <td>
                                <InputGroup>
                                    <Form.Select value={p.status} onChange={(e)=>onChangeStatus(e, p.oid)}>
                                        <option value="0">결제대기</option>
                                        <option value="1">결제완료</option>
                                        <option value="2">배송준비</option>
                                        <option value="3">배송중</option>
                                        <option value="4">배송완료</option>
                                        <option value="5">구매확정</option>
                                    </Form.Select>
                                    <Button variant='dark btn-sm' onClick={()=>onClickStatus(p.oid, p.status)}>변경</Button>
                                </InputGroup>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => setPage(page)} />
            }
        </div>
    )
}

export default OrderList