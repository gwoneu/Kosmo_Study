import { useLocation, useParams } from "react-router-dom";

function Product({data}) {
    const {id} = useParams();
    const product = data.find((product) => product.id === parseInt(id))
    
    return (
        <>
            <h2>상품명 : {product.name}</h2>
            <p>가격 : {product.price}</p>
        </>
    );
}

export default Product;