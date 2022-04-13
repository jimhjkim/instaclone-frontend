import { handleLogout } from '../apollo';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => handleLogout()}>Log out now!</button>
    </div>
  );
};
export default Home;
