import { NavLink } from 'react-router-dom';

function MenuItem({ data }) {
    return (
        <div className='lg:ml-8 text-xl lg:my-0 my-7'>
            <NavLink
                exact
                to={`/categories/${data}`}
                className="uppercase col-span-1 w-[170px] hover:text-primary duration-500 lg:text-white text-black"
                // className=""
                end
            >
                {data}
            </NavLink>
        </div>
    );
}

export default MenuItem;
