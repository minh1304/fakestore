import { NavLink } from 'react-router-dom';

function MenuItem({ data }) {
    return (
        <div className='md:ml-8 text-xl md:my-0 my-7'>
            <NavLink
                exact
                to={`/categories/${data}`}
                className="uppercase col-span-1 w-[170px] hover:text-primary duration-500 md:text-white text-black"
                // className=""
                end
            >
                {data}
            </NavLink>
        </div>
    );
}

export default MenuItem;
