'client only'
import Link from 'next/link'
import React from 'react'
import Navbar from '../components/Landing/Navbar'
import Hero from '../components/Landing/Hero'
import Features from '../components/Landing/Features'
import HowItWorks from '../components/Landing/HowItWorks'
import Pricing from '../components/Landing/Pricing'
import FAQs from '../components/Landing/FAQs'
import Contact from '../components/Landing/Contact'
import Footer from '../components/Landing/Footer'
const Teacher = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <Pricing/>
    <FAQs/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default Teacher