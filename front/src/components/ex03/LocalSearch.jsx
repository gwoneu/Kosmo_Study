import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Spinner, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const LocalSearch = () => {
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    let page = parseInt(search.get("page"));
    //let query = search.get("query");
    const [query, setQuery] = useState(search.get("query"));

    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const getLocal = async() => {
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=5&page=${page}`;
        const config = {
            headers: {
                "Authorization":"KakaoAK b9e7c3ac23fcce51a89eeebcbaf568f1"
            }
        }
        setLoading(true);
        const res = await axios.get(url, config);
        //console.log(res.data);
        setLocals(res.data.documents);
        setTotal(res.data.meta.pageable_count); //검색수
        setEnd(res.data.meta.is_end); //마지막페이지
        setLoading(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigator(`/local?page=${page}&query=${query}`);
    }
    useEffect(()=>{
        getLocal();
    }, [location]);

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <div className='my-5'>
            <h1 className='text-center my-5'>지역검색</h1>
            {loading ?
                <div className='text-center'>
                    <Spinner/>
                <h5>로딩중입니다...</h5>
                </div>
                :
                <>
                    <div>
                        <Row>
                            <Col md={4}>
                                <form onSubmit={onSubmit}>
                                    <InputGroup>
                                        <Form.Control onChange={onChange} value={query}/>
                                        <Button type='submit' variant='dark'>검색</Button>
                                    </InputGroup>
                                </form>
                            </Col>
                            <Col>
                                검색수 : {total}
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <Table>
                        <thead>
                            <tr>
                                <th>지역명</th>
                                <th>주소</th>
                                <th>전화</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local=>
                                <tr key={local.id}>
                                    <td>{local.id}{local.place_name}</td>
                                    <td>{local.address_name}</td>
                                    <td>{local.phone}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button variant="dark" onClick={()=>navigator(`/local?page=${page-1}&query=${query}`)} disabled={page===1}>이전</Button>
                        <span className='mx-3'>{page} / {Math.ceil(total/5)}</span>
                        <Button variant="dark" onClick={()=>navigator(`/local?page=${page+1}&query=${query}`)} disabled={end}>다음</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default LocalSearch