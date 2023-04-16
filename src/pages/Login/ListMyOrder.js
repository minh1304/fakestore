function ListMyOrder({ data }) {
    console.log(data);
    return (
        <div className="ml-10 mt-10 mb-10 border-2 border-gray-300 p-10 ">
            <span className="text-lg">Status: {data.status}</span>
            <div>
                {data.purchased.map((item) => (
                    <div className="mb-10 flex">
                        <div className="mt-3">
                            <img className="w-20" src={item.image} />{' '}
                        </div>
                        <div className="ml-10">
                            <div className="mt-3 ">
                                Amount: {item.amount}
                            </div>
                            <div>{item.title}</div>
                            <div>Price: {item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-lg font-medium">
                Total: {data.total}

            </div>

        </div>
    );
}

export default ListMyOrder;
