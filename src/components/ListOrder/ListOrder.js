function ListOrder({ data }) {
    return (
        <div className="mt-10 min-h-[300px] border-2 p-5">
            <div>
                <h1>Name is: </h1>
                <span className="text-black">{data.name}</span>
            </div>
            <div className="mt-3">
                <h1>Address is:</h1>
                <span className="text-black">{data.address}</span>
            </div>
            <div className="mt-3">
                <h1>Number phone: </h1>
                <span className="text-black">{data.phoneNumber}</span>
            </div>
            <div className="mt-3">
                <h1>Note: </h1>
                <span className="text-black">{data.note}</span>
            </div>
            <div className="mt-3">
                <h1>Price: </h1>
                <span className="text-black">{data.total}</span>
            </div>
            <div className="mt-3">
                <h1>List item: </h1>
                {data.purchased.map((item, index) => (
                    <div className="grid grid-cols-10 mt-10">
                        <div className="col-span-6">
                            <img
                                className="w-[100px]"
                                src={item.image}
                                alt="img err"
                            />
                        </div>
                        <div className="col-span-2">
                            <h1>Title: </h1>
                            <p>{item.title}</p>
                        </div>
                        <div className="col-span-2 flex">
                            <h1>Amount: </h1>
                            <h1 className="ml-3 text-red-500">{item.amount}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListOrder;
