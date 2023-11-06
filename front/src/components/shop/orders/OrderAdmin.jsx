import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import OrderModal from './OrderModal';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const OrderAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState('');
    const size = 5;
    const navi = useNavigate();

    const getList = async () => {
        setLoading(true);
        const res = await axios(`/orders/list.json?page=${page}&size=${size}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, [location]);

    const onChangePage = () => {
        navi(`/orders/admin?page=${page}&size=${size}&query=${query}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/orders/admin?page=1&size=${size}&query=${query}`);
    }
    if (loading) return <div className='text-center my-5'><Spinner variant='dark' /></div>
    return (
        <div className='my-5 orderadminpage_container'>
            <h1 className='text-center mb-5'>주문관리</h1>
            <div className='orderadminpage_content'>
                <Row className='mb-2'>
                    <Col md={4}>
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                            <Form.Control placeholder='주문자, 주소 전화번호' value={query} onChange={(e)=>setQuery(e.target.value)}/>
                            <Button type='submit' variant='outline-dark'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                    <Col className='mt-2'>
                        검색 수 : {total}건
                    </Col>
                </Row>
                <Table hover>
                    <thead>
                        <tr className='text-center'>
                            <th>주문번호</th>
                            <th>주문자일</th>
                            <th>전화</th>
                            <th>금액</th>
                            <th>주문상태</th>
                            <th>주문상품</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(p =>
                            <tr key={p.pid} className='text-center'>
                                <td>{p.pid}</td>
                                <td>{p.fmtdate}</td>
                                <td>{p.rphone}</td>
                                <td>{p.fmtsum}원</td>
                                <td>{p.str_status}</td>
                                <td><OrderModal purchase={p} sum={p.fmtsum} /></td>
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
                        onChange={onChangePage} />
                }
            </div>
        </div>
    )
}

export default OrderAdmin