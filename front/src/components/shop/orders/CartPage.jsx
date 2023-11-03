import React, { useContext, useEffect, useState } from 'react'
import OrderPage from './OrderPage'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Spinner, Table, Alert, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { LiaTrashAlt } from 'react-icons/lia'
import { BoxContext } from '../BoxContext';

const CartPage = () => {
    const {setBox} = useContext(BoxContext)
    const location = useLocation();
    const pathname = location.pathname;
    const search = new URLSearchParams(location.search);
    const show = search.get("show") ? search.get("show") : "cart";
    const navi = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sum, setSum] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0); //체크된 체크박수 갯수

    const onClickOrder = () => {
        if(count === 0){
            setBox({
                show:true,
                message:"주문할 도서를 선택하세요."
            });
        }else{
            navi(`${pathname}?show=order`)
        }
    }

    const getCart = async () => {
        setLoading(true);
        const res = await axios.get(`/cart/list.json?uid=${sessionStorage.getItem("uid")}`);
        let list = res.data.list;
        list = list.map(book=>book && {...book, checked : false});
        //console.log(list);
        setBooks(list);
        let sum1 = 0;
        let total1 = 0;
        list.forEach(book=>{
            sum1 += book.sum;
            total1 += book.qnt;
        });
        setSum(sum1);
        setTotal(total1);
        setLoading(false);
    }

    useEffect(()=>{
        getCart();
    },[]);

    useEffect(()=>{
        let count = 0;
        books.forEach(book=>book.checked && count++);
        setCount(count);
    },[books]);

    const onDelete = (cid) => {
        setBox({
            show:true,
            message:`${cid}번 장바구니 상품을 삭제하시겠습니까?`,
            action: async ()=> {
                await axios.post("/cart/delete", {cid});
                getCart();
            }
        });
    }

    const onChange = (cid, e) => {
        const list = books.map(book=>book.cid === cid ? {...book, qnt:e.target.value} : book);
        setBooks(list);
    }

    const onUpdate = (cid, qnt) => {
        setBox({
            show:true,
            message:`${cid}번 도서의 수량을 ${qnt}로 변경하시겠습니까?`,
            action: async ()=>{
                await axios.post("/cart/update", {cid, qnt});
                getCart();
            }
        });
    }

    const onChangeAll = (e) => {
        const list = books.map(book=>book && {...book, checked:e.target.checked});
        setBooks(list);
    }

    const onChangeSingle = (e, cid) => {
        const list = books.map(book=>book.cid === cid ? {...book, checked:e.target.checked} : book);
        setBooks(list);
    }

    const onDeleteChecked = () => {
        if(count === 0){
            setBox({show:true, message:"삭제할 도서를 선택하세요."});
        }else{
            setBox({
                show:true,
                message:`${count}개의 도서를 장바구니에서 삭제하시겠습니까?`,
                action: async ()=>{
                    for(const book of books){
                        if(book.checked){
                        await axios.post("/cart/delete", {cid:book.cid});
                        }
                    }
                    getCart();
                }
            });
        }
    }

    if(loading) return <div className='text-center my-5'><Spinner variant='dark'/></div>
    return (
        <>
            {show === "cart" && 
                <div className='my-5 cartpage_container'>
                    <h1 className='text-center mb-5'>장바구니</h1>
                    <div className='cartpage_content'>
                        <div><Button onClick={onDeleteChecked} variant='outline-dark' size='sm' className='mb-2'>선택상품삭제</Button></div>
                        <Table hover>
                            <thead>
                                <tr className='text-center'>
                                    <th>
                                        <input onChange={onChangeAll} type='checkbox' checked={books.length === count}/>
                                    </th>
                                    <th>제목</th>
                                    <th>가격</th>
                                    <th>수량</th>
                                    <th>합계</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book=>
                                    <tr key={book.cid} className='cartpage_tbody align-middle'>
                                        <td className='text-center'>
                                            <input onChange={(e)=>onChangeSingle(e, book.cid)} type='checkbox' checked={book.checked}/>
                                        </td>
                                        <td><div className='ellipsis'>[{book.bid}] {book.title}</div></td>
                                        <td className='text-center'>{book.fmtprice}원</td>
                                        <td className='text-center'>
                                            <input value={book.qnt} onChange={(e)=>onChange(book.cid, e)}
                                                size={2} className='text-center me-1'/>
                                            <Button onClick={()=>onUpdate(book.cid, book.qnt)} variant='outline-dark' size='sm'>변경</Button>
                                        </td>
                                        <td className='text-center'>{book.fmtsum}원</td>
                                        <td className='text-center'>
                                            <LiaTrashAlt className='cartpage_deletei_icon' onClick={()=>onDelete(book.cid)}/>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <Alert className='cartpage_count' variant='secondary'>
                            <Row>
                                <Col>총 도서수량 : {total}권</Col>
                                <Col className='text-end'>합계 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                            </Row>
                        </Alert>
                        <div className='text-center'>
                            {books.length > 0 &&
                                <Button variant='dark' size='sm' onClick={onClickOrder} className='px-5'>주문하기</Button>
                            }
                            <Button variant='outline-dark' size='sm' className='px-5 ms-2'>쇼핑계속하기</Button>
                        </div>
                    </div>
                </div>
            }

            {show === "order" &&
                <OrderPage books={books}/>
            }
        </>
    )
}

export default CartPage