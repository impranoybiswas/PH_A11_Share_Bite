import React from 'react'
import Container from '../customs/Container'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Link } from 'react-router'
import { IoHome } from 'react-icons/io5'

export default function Error() {
  return (
    <Container>
      <DotLottieReact className='h-96' src="../assets/error.lottie" loop autoplay />
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary my-4'>Page Not Found</h1>
      <Link className='btn btn-secondary text-white' to='/'><IoHome />Go to Home</Link>
    </Container>
  )
}

