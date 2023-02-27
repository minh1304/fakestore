function Advertising({ data }) {
    const ads = [
        {
            // 626 417
            url: 'https://img.freepik.com/premium-vector/technology-future-banner_23-2148756649.jpg',
        },
    ];
    const test = data.slice(0, 4);
    console.log(test[1]);
    return (
        <div className="flex">
            <div>
                <div>Electronics</div>
                <div className="max-w-[1400px] h-[500px] w-[651px] relative group ">
                    <div
                        style={{
                            backgroundImage: `url(${ads[0].url})`,
                        }}
                        className="w-full h-full bg-center bg-cover duration-500"
                    ></div>
                </div>
                <div>ahihi</div>
                {test.map((test1, index) => {
                    <div
                        key={index}
                        className="w-[100px] h-[200px]"
                        // style={{
                        //     backgroundImage: `url(${test1[index].image})`,
                        // }}
                    ></div>;
                })}
            </div>

            {/* <div className="max-w-[1400px] h-[500px] w-[651px] relative group ">
                <div
                    style={{
                        backgroundImage: `url(${ads[0].url})`,
                    }}
                    className="w-full h-full bg-center bg-cover duration-500"
                ></div>
            </div> */}
        </div>
    );
}

export default Advertising;
