import React, {useState} from "react";

const CartItem = ({id, text}) => {
    return <li key={id}>{text}</li>
};

const CartSet = ({data}) => {
    return (
        <ul>
            {data.map((item) => (
                <CartItem key={item.id} id={item.id} text={item.text}/>
            ))}
        </ul>
    );
};

const Cart = () => {
    const [items, setItem] = useState([]);

    const [input, inputValue] = useState('');

    const handleChange = (event) => {
        inputValue(event.target.value);
    };

    const handleAdd = () => {
        const newItem = {id: items.length + 1, text:input};
        setItem([...items, newItem]);
        inputValue("");
    };
    
    return (
        <div>
            <input type="text" value={input} onChange={handleChange}/>
            <button onClick={handleAdd}>Add</button>
            <CartSet data={items}/>
        </div>
    );
};

export default Cart;