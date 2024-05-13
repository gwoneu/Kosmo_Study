import React, {useState} from 'react';

export function Sycle() {
    //count 현재 값, setCount count 업데이트 해주는 함수
    const [count, setCount] = useState(0);

    return (
        <div>
            <p> {count} 번 클릭했습니다.</p>
            <button onClick={() => setCount(count + 1)}>Click!</button>
        </div>
    );
}
