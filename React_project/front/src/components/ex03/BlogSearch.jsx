import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';

const BlogSearch = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);
    const [cnt, setCnt] = useState(0);
    const ref_query = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const [query, setQuery] = useState(search.get("query"));
    const page = parseInt(search.get("page"));
    //console.log(page, query);
    
    const getBlogs= async ()=>{
        const url=`https://dapi.kakao.com/v2/search/blog?page=${page}&query=${query}&size=5`; //변수와 문자열을 연결할 때 백틱(``)
        const config ={
            headers: {
                "Authorization":"KakaoAK b9e7c3ac23fcce51a89eeebcbaf568f1"
            }
        }
        setLoading(true);
        const res = await axios(url, config);
        //console.log(res.data);
        let data = res.data.documents;
        data = data.map(blog=>blog && {...blog, show:false, checked:false});
        setBlogs(data);
        setEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    useEffect(()=>{
        getBlogs();
    }, [location]);

    useEffect(()=> {
        let cnt = 0;
        blogs.forEach(blog=>blog.checked && cnt++);
        console.log(cnt);
        setCnt(cnt);
    },[blogs]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(query == ""){
            alert("검색어를 입력하세요!");
            ref_query.current.focus();
        } else {
            navigate(`/blog?page=1&query=${query}`);
        }
    }

    const onClick = (url) => {
        let data = blogs.map(blog=>blog.url === url ? {...blog, show:!blog.show} : blog); //값을 toggle 시켜줌
        setBlogs(data);
    }

    const onChangeAll = (e) => {
        let data = blogs.map(blog=>blog && {...blog, checked:e.target.checked});
        setBlogs(data);
    }

    const onChangeSingle = (e, url) => {
        let data = blogs.map(blog=>blog.url===url ? {...blog, checked:e.target.checked} : blog);
        setBlogs(data);
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>블로그검색</h1>
            {loading ?
                <div>로딩중입니다..</div>
                :
                <>
                <Row className='mb-5'>
                    <Col md={4}>
                        <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)} ref={ref_query}/>
                            <Button variant="dark" type='submit'>검색</Button>
                        </InputGroup>
                        </form>
                    </Col>
                    <Col>검색수 : {total}</Col>
                </Row>
                <hr/>
                    <Table striped hover className='mb-5'>
                        <thead>
                            <tr>
                                <th><input type="checkbox" onChange={onChangeAll} checked={cnt==blogs.length}/></th>
                                <th>블로그이름</th>
                                <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, index)=>
                                <tr key={blog.url}>
                                    <td><input onChange={(e)=>onChangeSingle(e, blog.url)} type="checkbox" checked={blog.checked}/></td>
                                    <td>{index} : <a href={blog.url}>{blog.blogname}</a></td>
                                    <td>
                                        <div onClick={()=>onClick(blog.url)} dangerouslySetInnerHTML={{__html:blog.title}} style={{cursor:'pointer', color:'black', fontWeight:'bold'}}></div>
                                        {blog.show &&
                                        <div dangerouslySetInnerHTML={{__html:blog.contents}}></div>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center'>
                        <Button variant="dark" disabled={page===1} onClick={()=>navigate(`/blog?page=${page-1}&query=${query}`)}>이전</Button>
                        <span className='mx-2'> {page} / {Math.ceil(total/5)} </span>
                        <Button variant="dark" disabled={end} onClick={()=>navigate(`/blog?page=${page+1}&query=${query}`)}>다음</Button>
                    </div>
                </>            
            }
            {/*jsx 주석*/}
        </div>
    )
}

export default BlogSearch