import React, { useEffect, useState } from 'react'
import { Table, Alert, Row, Col } from 'react-bootstrap'

const OrderPage = ({books}) => {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0); //주문할 전체 상품갯수
    const [sum, setSum] = useState(0); //주문할 상품합계

    useEffect(()=>{
        const list = books.filter(book=>book.checked);
        setOrders(list);

        let sum = 0;
        let total = 0;
        list.forEach(book=>{
            sum += book.sum;
            total += book.qnt;
        });
        setSum(sum);
        setTotal(total);
    },[]);

    return (
            <div className='my-5 orderpage_container'>
                <h1 className='text-center mb-5'>주문하기</h1>
                <div className='orderpage_content'>
                    <Table hover>
                        <thead>
                            <tr className='text-center'>
                                <th>제목</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(book=>
                                <tr key={book.cid}>
                                    <td className='ellipsis'>[{book.bid}] {book.title}</td>
                                    <td className='text-center'>{book.fmtprice}원</td>
                                    <td className='text-center'>{book.qnt}권</td>
                                    <td className='text-center'>{book.fmtsum}권</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert>
                        <Row>
                            <Col>총 주문수량 : {total}</Col>
                            <Col>총 주문금액 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                        </Row>
                    </Alert>
                </div>
            </div>
    )
}

export default OrderPage