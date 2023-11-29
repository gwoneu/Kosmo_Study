import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from 'react-js-pagination';
import OrderPage from './OrderPage';

const CartList = () => {
    const [isOrder, setIsOrder] = useState(false);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [sum, setSum] = useState(0);
    const [checkSum, setCheckSum] = useState(0);

    const [page, setPage] = useState(1);
    const size = 1000;
    const uid = sessionStorage.getItem("uid");

    const getList = async () => {
        const res = await axios(`/cart/list.json?page=${page}&size=${size}&uid=${uid}`);
        //console.log(res.data);
        const data = res.data.list.map(c=> c && {...c, checked:false});
        setList(data);
        setTotal(res.data.total);
        setSum(res.data.sum);
    }

    useEffect(()=>{
        getList();
    },[page]);

    useEffect(()=>{
        let count=0;
        let sum=0;
        list.forEach(c=>{
            if(c.checked){
                count++;
                sum+=c.sum;
            }
        });
        setCnt(count);
        setCheckSum(sum);
    }, [list]);
    
    const onDelete = async (cid) => {
        await axios.post(`/cart/delete/${cid}`);
        getList();
    }

    const onChangeAll = (e) => {
        const data = list.map(c=>c && {...c, checked:e.target.checked});
        setList(data);
    }

    const onChangeSingle = (e, cid) => {
        const data = list.map(c=>c.cid === cid ? {...c, checked:e.target.checked} : c);
        setList(data);
    }

    const onDeleteChecked = async () => {
        if(cnt === 0) {
            alert("삭제할 상품을 선택해주세요.");
        }else{
            for(const c of list){
                if(c.checked) {
                    await axios.post(`/cart/delete/${c.cid}`);
                }
            }
            getList();
        }
    }

    const onChangeQnt = (e, cid) => {
        const data = list.map(c=>c.cid === cid ? {...c, qnt:e.target.value} : c);
        setList(data);
    }

    const onUpdateQnt = async (cid, qnt) => {
        await axios.post("/cart/update/qnt", {cid, qnt});
        alert("수량 수정이 완료되었습니다.");
        getList();
    }

    const onClickOrder = () => {
        if(cnt === 0){
            alert("주문할 상품을 선택하세요.");
        }else{
            setIsOrder(true);
        }
    }

    return (
        <>
            {!isOrder ?
                <div className='my-5'>
                    <h1 className='title'>장바구니</h1>
                    {list.length > 0 ?
                    <>
                    <Row className='mb-3'>
                        <Col>
                            상품수 : {total} 개
                        </Col>
                        <Col className='text-end'>
                            <Button variant='outline-dark btn-sm' onClick={onDeleteChecked}>선택상품삭제</Button>
                        </Col>
                    </Row>
                    <Table hover bordered className='tablegroup'>
                        <thead className='text-center'>
                            <tr>
                                <th><input type='checkbox' onChange={onChangeAll} checked={list.length === cnt}/></th>
                                <th colSpan={3}>상품명</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(c=>
                                <tr key={c.cid}>
                                    <td><input type='checkbox' checked={c.checked} onChange={(e)=>onChangeSingle(e, c.cid)}/></td>
                                    <td>{c.cid}</td>
                                    <td>
                                        <img src={`/display?file=${c.image}`} width="50"/>
                                    </td>
                                    <td>[{c.pid}] {c.title}</td>
                                    <td>{c.fmtprice}원</td>
                                    <td>
                                        <InputGroup className='cart_input_group'>
                                            <Form.Control onChange={(e)=>onChangeQnt(e, c.cid)} value={c.qnt} type='number'/>
                                            <Button variant='outline-dark' onClick={()=>onUpdateQnt(c.cid, c.qnt)}>수정</Button>
                                        </InputGroup>
                                    </td>
                                    <td>{c.fmtsum}원</td>
                                    <td><Button variant='dark btn-sm' onClick={()=>onDelete(c.cid)}>삭제</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert className='cart_alert text-center' variant='secondary'>총 금액 : <strong> {sum}원</strong></Alert>
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
                    <div className='text-center mt-3'>
                        <Button variant='outline-dark' href='/'>쇼핑계속하기</Button>
                        <Button variant='dark ms-3' onClick={onClickOrder}>주문하기</Button>
                    </div>
                    </>
                    :
                    <Alert variant='secondary' className='text-center'>장바구니가 비어있습니다.</Alert>
                    }
                </div>
                :
                <OrderPage list={list} checkSum={checkSum}/>
            }
        </>
    )
}

export default CartList