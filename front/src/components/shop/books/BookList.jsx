import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Table, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const BookList = () => {
    const size = 5;
    const location = useLocation();
    const navi=useNavigate();
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    //console.log(path, query, page, size);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const getBooks = async () => {
        const url = `/books/list.json?query=${query}&page=${page}&size=${size}`;
        setLoading(true);
        const res = await axios(url);
        //console.log(res.data);
        setBooks(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [location]);

    const onChangePage = (page) =>{
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
    }

    const onDelete = async (bid) => {
        if(!window.confirm(`${bid}번 도서를 삭제하시겠습니까?`)) return;
        const res = await axios.post('/books/delete', {bid});
        if(res.data === 0){
            alert('삭제를 실패했습니다.');
        }else{
            alert('삭제를 완료했습니다.');
            getBooks();
        }
    }

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>
    return (
        <div className='my-5 booklist_container'>
            <h1 className='text-center mb-5'>도서목록</h1>
            <div className='booklist_contents'>
                <div className='booklist_search'>
                    <div className='mt-1 booklist_count'>
                        <p>검색수: {total}권</p>
                    </div>
                    <div className='booklist_form'>
                        <div md={3}>
                            <form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                                    <Button variant="dark" type='submit'>검색</Button>
                                </InputGroup>
                            </form>
                        </div>
                    </div>
                </div>
                <Table className='align-middle'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>이미지</th>
                            <th>제목</th>
                            <th>저자</th>
                            <th>가격</th>
                            <th>등록일</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book =>
                            <tr key={book.bid}>
                                <td>{book.bid}</td>
                                <td><img src={book.image} width="30" /></td>
                                <td width="30%"><div className='ellipsis'>{book.title}</div></td>
                                <td width="20%"><div className='ellipsis'>{book.authors}</div></td>
                                <td>{book.fmtprice}원</td>
                                <td>{book.fmtdate}</td>
                                <td><Button onClick={()=>onDelete(book.bid)} size='sm' variant='outline-dark'>삭제</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className='booklist_pagination'>
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
        </div>
    )
}

export default BookList