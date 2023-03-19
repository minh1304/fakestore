function Dashboard() {
    // const handleTest = () => [
    //     fetch('https://fakestoreapi.com/products',{
    //         method:"POST",
    //         body:JSON.stringify(
    //             {
    //                 title: 'test product',
    //                 price: 13.5,
    //                 description: 'lorem ipsum set',
    //                 image: 'https://i.pravatar.cc',
    //                 category: 'electronic'
    //             }
    //         )
    //     })
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))
    // ];
    return (
        <div>
            {/* <Header /> */}
            <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-12">
                <div className="xl:col-span-1"></div>
                <div className="xl:col-span-10 2xl:col-span-10">
                    <div className="col-span-1">Add new product</div>
                </div>
                <div className="xl:col-span-1"></div>
            </div>
        </div>
    );
}

export default Dashboard;
