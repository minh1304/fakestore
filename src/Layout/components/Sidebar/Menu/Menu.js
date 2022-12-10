import { NavLink } from 'react-router-dom';

function MenuItem({ data }) {
    return (
        <>
            <NavLink
                to={`/categories/${data}`}
                className="uppercase col-span-1 w-[170px] hover:text-primary duration-300"

                end
            >
                {data}
            </NavLink>
        </>
    );
}

export default MenuItem;
