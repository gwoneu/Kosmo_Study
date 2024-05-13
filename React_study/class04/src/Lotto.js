import React, {useState} from "react";

const Lotto = () => {
    const [mode, setMode] = useState("auto");
    const [numbers, setNumbers] = useState([]);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const handleChange = (event, index) => {
        const newNumbers = [...numbers];
        const inputValue = Number(event.target.value);

        if(inputValue >= 1 && inputValue <= 45) {
            newNumbers[index] = inputValue;
            setNumbers(newNumbers);
        } else {
            alert("숫자는 1부터 45 사이로 입력해주세요.");
        }
    };

    const handleSubmitLotto = () => {
        //중복, 비어있는 것
        if(numbers.length === new Set(numbers).size) {
            setIsDuplicate(false);

            const sortedNumbers = numbers.sort((a,b) => a-b);
            
            // 배열안에 숫자들이 1개라도 잘못들어가면 true -> 숫자를 모두 입력해주세요. 라는 문구가 뜬다.
            if(sortedNumbers.some(numbers => !numbers)) { //어떤 값이 0 또는 false인지 확인, ![1,2,3,4,5] : false, [1, false, true, null, undefined] : true
                alert("숫자를 모두 입력해주세요.");
            } else {
                alert("수동으로 선택한 번호 : " + sortedNumbers.join(", "));
            }

        } else {
            setIsDuplicate(true);

            alert("중복된 숫자가 있습니다. 다시 입력해주세요.");
        }
    };

    const createRandomNumber = () => {
        const randomNumber = [];
        while(randomNumber.length < 6) {
            const number = Math.floor(Math.random()*45)+1;
            if(!randomNumber.includes(number)) {
                randomNumber.push(number); //데이터가 해당 부분에서만 사용된다.
            }
        }
        const sortedNumbers = randomNumber.sort((a,b) => a-b);
        setNumbers(sortedNumbers);
    };

    const handleModeChange = (event) => {
        setMode(event.target.value);
        setNumbers([]);
        setIsDuplicate(false);
    };

    return (
        <>
        <div>
            <label><input type="radio" value="auto" checked={mode === "auto"} onChange={handleModeChange}/>자동</label>
            <label><input type="radio" value="manual" checked={mode === "manual"} onChange={handleModeChange}/>수동</label>
        </div>

        <div>
            { mode ==="manual" && (
            <>
                <p>숫자를 입력하세요 :</p>
                {[0,1,2,3,4,5].map((index) => (
                    <input key={index} type="number" min="1" max="45" value={numbers[index] || ""} onChange={(event) => handleChange(event, index)}/>
                ))}
                <button onClick={handleSubmitLotto}>제출</button>

                {isDuplicate && (
                    <p>중복된 숫자가 있습니다. 다시 확인해주세요.</p>
                )}
            </>    
            )}

            { mode === "auto" && (
            <>
                <button onClick={createRandomNumber}>랜덤 번호 생성</button>
                {numbers.length > 0 && (
                    <>
                        <p>생성된 숫자 : </p>
                        {numbers.map((number) => (
                            <span key={number}>{number} </span>
                        ))}
                    </>
                )}
            </>
            )}
        </div>
        </>
    );
};

export default Lotto;