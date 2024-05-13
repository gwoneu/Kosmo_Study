import React, { useState } from 'react'
import '../../App.css'

const Count = () => {
    const [count, setCount] = useState(100); //[변수이름, 함수이름] -> 변수를 선언할때, 대괄호 -> 초기값을 선언할때는 소괄호 | react라는 라이브러리에 있는 useState를 사용하기 위해서는 상단에 import가 되어야함.
    return (
        <div className='count'>
            <button className='button' onClick={()=>setCount(count-1)}>감소</button>
            <span className='text'> {count} </span>
            <button className='button' onClick={()=>setCount(count+1)}>증가</button>
        </div>
    )
}

export default Count