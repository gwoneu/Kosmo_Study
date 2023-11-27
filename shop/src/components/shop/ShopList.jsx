import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Spinner, Table } from 'react-bootstrap'
import "../Pagination.css"
import Pagination from 'react-js-pagination'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ShopList = () => {
    const navi = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);

    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const size = 5;
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState("");

    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/shop/list.json?page=${page}&size=5&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    },[location]);

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`/shop/list?page=1&siez=${size}&query=${query}`);
    }

    const onDelete = async (shop) => {
        if(window.confirm(`${shop.pid}번 상품을 삭제하시겠습니까?`)){
            await axios.get(`/shop/delete?pid=${shop.pid}`);
            await axios.get(`/deleteFile?file=${shop.image}`);
            alert("상품이 삭제되었습니다.");
            navi(`/shop/list?page=1&siez=${size}&query=${query}`);
        }
    }

    if(loading) return <div className='text-center my-5'><Spinner/></div>
    return (
        <div className='my-5'>
            <h1 className='title'>상품목록</h1>
            <Row className='mb-4'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)} placeholder='상품명, 제조사' value={query}/>
                            <Button type='submit' variant='dark'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='mt-1'>
                    <span>상품수 : {total}건</span>
                </Col>
            </Row>
            <Table hover bordered className='tablegroup'>
                <thead>
                    <tr>
                        <th colSpan={2}>ID</th>
                        <th>상품명</th>
                        <th>상품가격</th>
                        <th>제조사</th>
                        <th>등록일</th>
                        <th>조회수</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=>
                        <tr key={s.pid}>
                            <td>{s.pid}</td>
                            <td><img src={`/display?file=${s.image}`} width={50}/></td>
                            <td>
                                <Link to={`/shop/update/${s.pid}`}>
                                <div className='ellipsis'>{s.title}</div>
                                </Link>
                            </td>
                            <td>{s.fmtprice}원</td>
                            <td>{s.maker}</td>
                            <td><div className='ellipsis'>{s.fmtdate}</div></td>
                            <td><div>{s.viewcnt}</div></td>
                            <td><Button onClick={()=>onDelete(s)} variant='outline-dark' size='sm'>X</Button></td>
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
                    onChange={(cpage)=>{navi(`/shop/list?page=${cpage}&size=${size}&query=${query}`)}}/>
            }
        </div>
    )
}

export default ShopList