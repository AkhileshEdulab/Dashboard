import React from 'react'
import Hero from './subComponents/Hero'
import TimeLine from './subComponents/TimeLine'
import About from './subComponents/About'
import Skills from './subComponents/Skills'
import Portfolio from './subComponents/Portfolio'
import MyApps from './subComponents/MyApps'
import Contact from './subComponents/Contact'

function Home() {
  return (
   
   <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:32 sm:mx-auto w-full max-w-[1050px] flex-col gap-14 '>
     
    <Hero/>
    <TimeLine/>
    <About/>
    <Skills/>
    <Portfolio/>
    <MyApps/>
    <Contact/>
   </article>
   

  )
}

export default Home