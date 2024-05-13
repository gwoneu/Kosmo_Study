import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from 'react-js-pagination';
import ModalOrder from './ModalOrder';

const OrderList = () => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size = 3;

    const getList = async () => {
        const res = await axios(`/purchase/list.json?uid=${sessionStorage.getItem("uid")}&page=${page}&size=${size}`);
        console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(()=>{
        getList();
    },[page]);

    return (
        <div className='my-5'>
            <h1 className='title'>주문목록</h1>
            <div className='mb-3'>
                주문건수 : {total}건
            </div>
            <Table hover bordered className='tablegroup'>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>주문자명</th>
                        <th>주문일</th>
                        <th>배송지</th>
                        <th>전화</th>
                        <th>금액</th>
                        <th>상태</th>
                        <th>상세보기</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.oid}>
                            <td>{p.oid}</td>
                            <td>{p.uname} ({p.uid})</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.address1} {p.address2}</td>
                            <td>{p.phone}</td>
                            <td>{p.fmtsum}원</td>
                            <td>{p.str_status}</td>
                            <td><ModalOrder p={p}/></td>
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