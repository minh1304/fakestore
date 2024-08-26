import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '~/config';


function ProductsList({ product, handleDelete }) {
    return (
        <div className="flex items-center bg-white shadow-md rounded-md p-4 mb-4 border border-gray-200">
            <div className="w-1/4">
                <img
                    src={product.Image}
                    alt={product.Title}
                    className="w-full h-auto rounded-md object-cover"
                />
            </div>
            <div className="w-3/4 ml-4">
                <h2 className="text-xl font-semibold mb-2">{product.Title}</h2>
                <p className="text-gray-700 mb-2">{product.Description}</p>
                <p className="text-lg font-bold text-green-600 mb-2">${product.Price}</p>
                <p className="text-sm text-gray-500 mb-4">Category: {product.Category}</p>
                <Link to={config.routes.editProduct.replace(':id', product.Id)}>
                    <button className="text-blue-500 hover:text-blue-700">
                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                        Adjust
                    </button>
                </Link>
                <button
                    onClick={() => handleDelete(product.Id)}
                    className="ml-10 text-red-500 hover:text-red-700 transition duration-200"
                >
                    <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                </button>
            </div>
        </div>
    );
}

export default ProductsList;
