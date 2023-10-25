import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';
import Book from './Book';
import { useRef } from 'react';

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);
    const [end, setEnd] = useState(false);
    const [query, setQuery] = useState("노드");
    const ref_txt = useRef(null);

    const getBooks = async() => {
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=5&page=${page}`;
        const config ={
            headers: {
                "Authorization":"KakaoAK b9e7c3ac23fcce51a89eeebcbaf568f1"
            }
        }
        setLoading(true);
        const res=await axios.get(url, config);
        //console.log(res);
        setLast(Math.ceil(res.data.meta.pageable_count/5)); //마지막페이지
        setBooks(res.data.documents);
        setEnd(res.data.meta.is_end); //마지막페이지면 True
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [page]);

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getBooks();
        ref_txt.current.focus();
    }
    
    return (
        <div>
            <h1 className='text-center my-5'>도서검색</h1>
            <Row className='mb-3'>
                <Col lg={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control ref={ref_txt} value={query} onChange={onChange}/>
                            <Button variant="dark" type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table striped>
                <thead>
                    <tr>
                        <th>이미지</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>저자</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? //?-> true 일때,
                    <div>로딩중입니다...</div>
                    :
                    books.map(book=><Book key={book.isbn} book={book}/>) //book={book} <- attr과 같은 것
                    }
                </tbody>
            </Table>
            {(last > 1 && !loading) &&
                <div className='text-center'>
                    <Button variant="dark" onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                    <span className='mx-3'>{page} / {last}</span>
                    <Button variant="dark" onClick={()=>setPage(page+1)} disabled={end}>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch