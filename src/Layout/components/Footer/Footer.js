import {
    faFacebook,
    faGithub,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
    return (
        <footer>
            <div className="p-10 bg-zinc-800 text-white w-full mt-40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                        <div className="ml-3 mb-5">
                            <h4 className="text-xl text-white pb-4 uppercase">
                                Company
                            </h4>
                            <p className="text-gray-400">
                                Quater 6, Linh Trung, Thu Dức, <br />
                                Ho Chi Minh <br />
                                Viet Nam <br />
                                <br />
                                <strong className="text-gray-300">
                                    Phone:
                                </strong>{' '}
                                +84 825 1139 <br />
                                <strong className="text-gray-300">
                                    Email:
                                </strong>{' '}
                                vtm1304@gmail.com <br />
                            </p>
                        </div>
                        <div className="ml-3 mb-5">
                            <h4 className="text-xl text-white pb-4 uppercase">
                                Customer support
                            </h4>
                            <ul className="text-gray-400">
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">Home</span>
                                    </p>
                                </li>
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">About us</span>
                                    </p>
                                </li>
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">Services</span>
                                    </p>
                                </li>
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">
                                            Delivery policy
                                        </span>
                                    </p>
                                </li>
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">
                                            Return policy
                                        </span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="ml-3 mb-5">
                            <h4 className="text-white pb-4 uppercase text-xl">
                                Our Link
                            </h4>
                            <ul className="text-gray-400">
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">Facebook</span>
                                    </p>
                                </li>
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">Instagram</span>
                                    </p>
                                </li>
                                <li className="relative group overflow-y-hidden h-[40px]">
                                    <p className="absolute group-hover:left-2 hover:text-white -left-6 transition-all duration-300 cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                        <span className="pl-3">Youtube</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="ml-3 mb-5">
                            <h4 className="text-white pb-4 uppercase text-xl">
                                Join Our Newsletter
                            </h4>
                            {/* <p className="text-gray-400 pb-2">
                                Join 25,000+ others and never miss out on new
                                tips, tutorials , and more
                            </p> */}
                            <form className="flex flex-row flex-wrap">
                                <input
                                    type="text"
                                    className="text-gray-500 w-2/3 p-2"
                                    placeholder="email@example.com"
                                />
                                <button className="p-2 w-1/3 bg-gray-500 text-white hover:bg-primary">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[100px] bg-black text-white px-10 overflow-y-hidden">
                <div className="max-w-7xl flex flex-col sm:flex-row py-4 mx-auto justify-between items-center">
                    <div className="text-center">
                        <div>
                            <span className="pr-1">Copyright</span>
                            <FontAwesomeIcon
                                className="mt-1 pr-1"
                                icon={faCopyright}
                            />
                            <strong className="uppercase">MT shop</strong>
                        </div>
                    </div>
                    <div className="text-center text-xl text-white mb-2 overflow-y-hidden">
                        <span className="mr-2 text-4xl">
                            <a
                                href="https://www.facebook.com/vtm1304/"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    className="text-white"
                                    icon={faFacebook}
                                />
                            </a>
                        </span>
                        <span className="mr-2 text-4xl">
                            <a
                                href="https://www.instagram.com/_t.ming/"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    className="text-white"
                                    icon={faInstagram}
                                />
                            </a>
                        </span>
                        <span className="mr-2 text-4xl">
                            <a
                                href="https://github.com/minh1304"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    className="text-white"
                                    icon={faGithub}
                                />
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
