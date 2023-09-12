import React from "react";

const ListItem = ({id, text}) => {
    return <li key={id}>{text}</li>
};

const ListSet = ({data}) => {
    return (
        <ul>
            {data.map((item) => (
                <ListItem key={item.id} id={item.id} text={item.text}/>
            ))}
        </ul>
    );
};

const List = () => {
    const items = [
        {id:1, text:'hello'},
        {id:2, text:'byebye'},
    ];

    return <ListSet data={items}/>
};

export default List;