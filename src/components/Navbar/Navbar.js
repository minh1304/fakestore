/* eslint-disable no-undef */
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {
    return (
        <div className="h-24 bg-slate-900 text-white text-center leading-[6rem] text-3xl">
            <FontAwesomeIcon icon={faSpotify} />
            Spotify
        </div>
    );
}

export default Navbar;
