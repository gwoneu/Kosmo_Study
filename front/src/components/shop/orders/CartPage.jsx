import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Spinner, Row, Col, Form } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';
import { BsTrash } from 'react-icons/bs'
import { BoxContext } from '../BoxContext';

const CartPage = () => {
    const { setBox } = useContext(BoxContext);
    const size = 5;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);

    const getCart = async () => {
        setLoading(true);
        const res = await axios.get(
            `/cart/list.json?uid=${sessionStorage.getItem("uid")}&size=${size}&page=${page}`);
        console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);

        const res1 = await axios.get(`/cart/sum?uid=${sessionStorage.getItem("uid")}`);
        setSum(res1.data.fmtsum);
        setLoading(false);
    }

    useEffect(()=>{
        getCart();
    },[page]);

    const onChangePage = (page) => {
        setPage(page);
    }

    const onClickUpdate = (cid, qnt) => {
        setBox({
            show:true,
            message:`${cid}번 수량을 ${qnt}권으로 변경하시겠습니까?`,
            action: async ()=>{
                await axios.post('/cart/update', {cid,qnt});
                getCart();
            }
        });
    }

    const onClickDelete = (cid) => {
        setBox({
            show:true,
            message:`${cid}번 장바구니 도서를 삭제하시겠습니까?`,
            action: async () => {
                await axios.post('/cart/delete', {cid});
                if(page === 1){
                    getCart();
                }else{
                    setPage(1);
                }
            }
        });
    }

    const onChange = (e, cid) => {
        setBooks(books.map(book=>book.cid === cid ? {...book, qnt:e.target.value} : book));
    }

    if(loading) return <div className='my-5 text-center'><Spinner variant='dark'/></div>
    return (
        <div className='my-5 cartpage_container'>
            <h1 className='mb-5 text-center'>장바구니 목록</h1>
            <div className='cartpage_content'>
                <Table className='align-middle'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>img</th>
                            <th>제목</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>합계</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book=>
                            <tr key={book.bid}>
                                <td>{book.bid}</td>
                                <td><img src={book.image || "http://via.placeholder.com"} width={30}/></td>
                                <td><div className='ellipsis'>{book.title}</div></td>
                                <td>{book.fmtprice}원</td>
                                <td>
                                    <input onChange={(e)=>onChange(e, book.cid)} value={book.qnt} size={2} className='text-end'/>
                                    <Button onClick={()=>onClickUpdate(book.cid, book.qnt)} variant='outline-dark' size='sm ms-1'>변경</Button>
                                </td>
                                <td>{book.fmtsum}원</td>
                                <td><BsTrash className='cartpage_delete' onClick={()=>onClickDelete(book.cid)}/></td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
                <Row>
                    <Col>총 주문상품 수량 : {total}</Col>
                    <Col className='text-end'>
                        총 상품금액 : {sum}원
                    </Col>
                </Row>
                {total > size &&
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={size}
                        totalItemsCount={total}
                        pageRangeDisplayed={10}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={onChangePage}/>
                }
            </div>
        </div>
    )
}

export default CartPage