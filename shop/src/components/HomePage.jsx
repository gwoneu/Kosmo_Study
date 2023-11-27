import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import "./Pagination.css";
import Pagination from 'react-js-pagination';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi2';

const HomePage = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const navi = useNavigate();

    const size = 6;
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState("");

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const getList = async () => {
        const res = await axios(`/shop/list.json?page=${page}&size=${size}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(() => {
        getList();
    }, [location]);

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/?page=1&size=${size}&query=${query}`);
    }

    if (loading) return <div className='my-5 text-center'><Spinner /></div>
    return (
        <div className='my-5'>
            <Row className='mb-3'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control placeholder='상품명, 제조사' value={query}
                                onChange={(e) => setQuery(e.target.value)} />
                            <Button variant='dark' type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='mb-3 mt-1'>
                    <span>상품수 : {total}개</span>
                </Col>
            </Row>
            <Row>
                {list.map(shop =>
                    <Col key={shop.pid} xs={6} md={4} lg={2}>
                        <Card className='hompage_card' style={{ cursor: 'pointer' }}>
                            <Link to={`/shop/info/${shop.pid}`}>
                                <Card.Body>
                                    <img src={`/display?file=${shop.image}`} width='90%' />
                                    <div className='producttitle ellipsis'>{shop.title}</div>
                                    <div className='price'>{shop.fmtprice}</div>
                                </Card.Body>
                            </Link>
                            <Card.Footer>
                                <small><HiHeart className='heart'/> : {shop.fcnt}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => { navi(`/?page=${page}&size=${size}&query=${query}`) }} />
            }
        </div>
    )
}

export default HomePage