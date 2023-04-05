function Account({data}) {
    return (
        <div className="mt-5 grid grid-cols-2">
            <p className="col-span-1">{data.username}</p>
            <p className="col-span-1">{data.email}</p>
        </div>
    );
}

export default Account;