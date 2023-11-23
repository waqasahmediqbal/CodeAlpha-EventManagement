import React from 'react'
import Navbar from './navbar.jsx';
import Header from './header.jsx'
import Events from '../pages/Event.jsx';
import Banner from './banner.jsx';

export default function Layout() {
  return (
    <>
    <Navbar/>
    <Header/>
    <Events/>
    <Banner/>
    </> )
}
