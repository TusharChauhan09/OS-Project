import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <nav className=" h-13 border-b shadow-xl inset-1  ">
      <ul className=" h-full flex p-2 justify-center items-center gap-9 md:gap-20" >
      
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li className=" h-full ">
          <Link to="/algorithms" className="h-full flex space-x-1 hover:cursor-pointer" >
            <img src="https://cdn-icons-png.flaticon.com/512/10061/10061724.png" className=" h-full " alt="" />
            <p className=" my-auto  ">Algorithm</p> 
          </Link>
        </li>

        <li className="">
          <Link to="/difference">Differences</Link>
        </li>

      </ul>
    </nav>
  );
};

export default NavBar;
