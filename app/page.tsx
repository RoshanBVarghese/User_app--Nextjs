// components/Home.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{marginTop:'15%'}}>
            <h1 className="text-center" style={{marginRight:'50%',marginTop:'5%',color:'lightblue',fontWeight:'500'}}><b>Welcome to <span style={{color:'red'}}>My Homie Restaurant!!</span></b></h1>
            <p  style={{marginLeft:'2%',fontSize:'15px',color:'white',textShadow:'2px 2px 4px black ',fontWeight:'800',marginTop:'2%'}}>
            Welcome to our exceptional culinary haven, where each meal is an exquisite journey of flavors and textures.<br/>
            At our restaurant, we pride ourselves on creating a warm and inviting atmosphere that mirrors the diversity and richness of our menu.<br/>
            Whether you're seeking a casual brunch, a romantic dinner, or a celebration with loved ones, our restaurant is the perfect setting.<br/>
            Our commitment to quality ingredients, innovative recipes, and personalized service ensures that every visit is a memorable gastronomic adventure.<br/>
            Welcome to a world where culinary excellence meets unparalleled hospitality, making every meal an unforgettable celebration.<br/>
            </p>
      </div>
    </div>
  );
};

export default Home;
