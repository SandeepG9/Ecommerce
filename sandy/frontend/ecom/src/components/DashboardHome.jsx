import React from 'react'
import Cards from './dashboardcomponents/Cards'
import Navbar from './Navbar'

const DashboardHome = () => {
  
  return (
    <>
      <div className='mb-32'>
        <Navbar></Navbar>
        
      </div>
        <div className='flex flex-wrap gap-4'>
            <Cards/>
        </div>
    </>
  )
}

export default DashboardHome
