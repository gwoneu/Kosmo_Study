import React, { useState, useEffect } from 'react' //use가 붙은것은 Hook(훅)이라고 한다.
import { Table, Spinner, Button } from 'react-bootstrap'

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false); //로딩중인지 알아볼 수 있는 변수
    const [page, setPage] = useState(19);
    const getTodos = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                const start=(page-1)*10 +1;
                const end=page*10;
                const newJson=json.filter(j=>j.id>=start && j.id<=end);
                setTodos(newJson);
                console.log(newJson);
                setLoading(false);
        })
    }
    useEffect(()=>{ //randering 할때마다 생성
        getTodos();
    }, [page]);

    if(loading) return (
        <div className='text-center my-5'>
            <Spinner/>
            <h5>로딩중입니다..</h5>
        </div>
    );

    return (
        <div className='m-5'>
            <h1 className='text-center my-5'>Todos</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo=>
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button variant="dark" onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-4'>{page}/20</span>
                <Button variant="dark" onClick={()=>setPage(page+1)} disabled={page===20}>다음</Button>
            </div>
        </div>
    )
}

export default Todos