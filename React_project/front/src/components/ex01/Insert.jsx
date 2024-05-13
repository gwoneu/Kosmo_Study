import React, { useState } from 'react'

const Insert = ({onInsert}) => {
    const [form, setForm] = useState({
        id: 5,
        name: "무기명",
        address:"서울 금천구 가산동"
    }); // 값은 소괄호, 오브젝트는 중괄호, 배열은 대괄호

    const {id, name, address} = form;
    const onSunmit = (e) => {
        e.preventDefault();
        if(window.confirm('등록하실래요?')){
            onInsert(form);
            setForm({
                id:id+1,
                name:'',
                address:''
            });
        }
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div>
            <h1>주소등록</h1>
            <form onSubmit={(e)=>onSunmit(e)}>
                <span>{id}</span>
                <input value={name} name='name' onChange={(e)=>onChange(e)}/>
                {name}
                <hr/>
                <input value={address} name='address' onChange={(e)=>onChange(e)}/>
                {address}
                <hr/>
                <button>등록</button>
                <button type="reset">취소</button>
            </form>
        </div>
    )
}

export default Insert