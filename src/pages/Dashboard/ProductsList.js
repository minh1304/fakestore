import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect } from 'react';

// function ProductsList({token, page,setProducts, product, handleDelete }) {
function ProductsList({ token, page, product, setProducts, handleDelete }) {
    useEffect(() => {
        console.log('Products list updated:', product);
    }, [product]);
    return (
        <div key={product._id} className="grid grid-cols-10">
            <div className="col-span-6 mt-5">
                <div className="w-[100px]">
                    <img src={product.image} />
                </div>
                <h2 className="mt-5">{product.title}</h2>
            </div>
            <div className="col-span-4">
                <div>
                    <span
                        onClick={() => handleDelete(product._id)}
                        className="mr-3 hover:text-red-500 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                </div>
            </div>
            {/* <hr className="mt-5 mb-5"></hr> */}
            <div className="bg-opacity-0 opacity-[0]">a</div>
        </div>
    );
    // return <div>ahihi</div>;
}

export default ProductsList;
