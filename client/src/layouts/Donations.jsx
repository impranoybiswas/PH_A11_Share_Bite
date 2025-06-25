import React from 'react'
import toast from 'react-hot-toast'

export default function Donations() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 w-full overflow-hidden'>
        <div 
        data-aos="fade-right"
        className='border-[1px] border-secondary/30 rounded-lg overflow-hidden p-4 shadow-sm bg-secondary/10 flex items-center gap-5'>
        <img className='size-30 lg:size-40 rounded-full shadow-sm' src="https://i.ibb.co.com/8L5KLJ8L/money.gif" />
        <div className='flex-1'>
        <h1 className='text-xl lg:text-3xl font-semibold text-secondary mb-3'>Thank You!</h1>
        <p className='text-sm lg:text-2xl text-accent/90'>More Then 1000 Donations by Great Hearted Peoples.</p>
        </div>
        </div>

        <div
        data-aos="fade-left"
        className='border-[1px] border-secondary/30 rounded-lg overflow-hidden p-4 shadow-sm bg-secondary/10 flex items-center gap-5 flex-col md:flex-row justify-center'>
        <img className='size-30 lg:size-40 rounded-full shadow-sm' src="https://i.ibb.co.com/vCQPps8H/alms.gif" />
        <div className='flex-1'>
        <h1 className='text-xl lg:text-3xl font-semibold text-secondary mb-3 text-center'>Donate Us</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          const amount = e.target.amount.value

          toast.success(`${amount} Taka Donated Successfully`);
        }}>
          <input className='input w-full input-secondary' type="number" name='amount' placeholder='Enter Amount' />
          <button className='btn btn-secondary w-full mt-3 shadow-none text-white'>Donate Now</button>
        </form>
        
  
        </div>
        
        
        </div>
      
    </div>
  )
}
