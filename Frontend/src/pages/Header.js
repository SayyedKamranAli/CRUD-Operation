import React from 'react'
import style from './style/header.module.css'
//import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function Header() {
//   window.onscroll = function() {myFunction()};

// var header = document.getElementById("myHeader");
// var sticky = header;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add('sticky');
//   } else {
//     header.classList.remove("sticky");
//   }
// }
  return (
    <div>
        {/* <nav >
    <ul className="justify-content-end">
      <li >
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </nav> */}
  <div className={style.head} id="myHeader">
  <Nav className="justify-content-end sticky" activeKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/blogs'>Blogs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home" >
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      </div>
  </div>
  )
}

export default Header