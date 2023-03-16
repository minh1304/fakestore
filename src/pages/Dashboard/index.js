import { useSelector } from 'react-redux';

function Dashboard() {

    // const user = useSelector((state) => state.user.user);
    const user = JSON.parse(localStorage.getItem('user'));
    
    console.log(user);
    return (
        <div>{user ? <div>Có đăng nhập</div> : <div>Không đăng nhập</div>}</div>
    );
}

export default Dashboard;
