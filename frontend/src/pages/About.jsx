import React from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'
import AlgorithmOverview from '../components/AlgorithmOverview'


const About = () => {
  return (
    <div>
      <Hero />
      <AlgorithmOverview />
      <Card 
        name="Michael Chen"
        role="UI/UX DESIGNER"
        id="12310419"
        imageUrl="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
        githubUrl="https://github.com/username"
        linkedinUrl="https://linkedin.com/in/username"
        email="mailto:example@email.com"
      />
    </div>
  )
}

export default About
