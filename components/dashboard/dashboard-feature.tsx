// import { AppHero } from '@/components/app-hero'
//ts-ignore

import{useState, useEffect} from 'react'
import {main} from '../functions/list-files';
// import {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router';
// import * as Logo from'../imgs/Vitamin.jpg'
import Vitamin from '../imgs/Vitamin.jpg'
import Cover from '../imgs/Cover.jpg'
import Diego2 from '../imgs/Diego2.jpg'
import Rhino from'../imgs/RHINOGUN.jpg'
import Gorilla from '../imgs/Gorilla1.jpg'
import Drag from '../imgs/Dragon2.jpg'

// import {Vitamin.jpg} from '../imgs'
export default function DashboardFeature() {

  const [pics, setPics]=useState([])

  useEffect(()=>{
 
    console.log ("=>",main())

  },[])

  
  var now = new Date().getTime();
 var countDownDate = new Date("Oct 31, 2025 15:37:25").getTime();

   // Find the distance between now and the count down date
  var distance = countDownDate - now;
   
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

   console.log(days + "d " + hours + "h "
  + minutes + "m " + seconds + "s "
)

 
 
 
  return (
    <div className ='container'>
    
      {/* <AppHero   title="Maybe-Art" subtitle="Where Art meets BlockchainSolana app." > */}



        

       
      {/* </AppHero> */}
      <div className="vril">
                        
           <div className=''> 
             <div> 

              <div className='top'> 
                             {/* <h1 className='title'>MAYBE ART</h1> */}
                                         <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-dodger-blue-500 to-purple-500 bg-clip-text border 2px solid bg-pink-300 text-transparent drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                                       
                                          MAYBEART
                                          </h1>
                             <h5 className='cyber-text-h2'> Empowering Artists Tokenizing Creativity</h5>
                           



              </div>

              <div className= 'buttons'> 


                  <button className='cyber-button'>BUY  MAYBEART TOKEN
                    
                    
                     </button>
           
            <Link to ='/upload'>
            
                       <button className='cyber-button'>UPLOAD & GET PAID
                     </button>
            </Link>
          


              </div>
                  <div className='countdown'> 
                <h2  className ='cyber-text-h2'font-family= 'Space Mono'>
                 Countdown to October 30 Auction</h2>
            </div>
                
            <div className= 'Auction'> 
               
              
            <div className= 'time'>

              
<h1  className ='time-unit'font-family= 'Space Mono'> {days} : </h1>
 <h3 className ='time-unit-small'>DAYS</h3>
               </div>
            <div className= 'time'>
               <h1 className= 'time-unit'> 
                {hours} :
                </h1> 
                <h1></h1>
              <h3 className= 'time-unit-small'>HRS </h3>
            </div>

            <div className = 'time'>

          <h1 className='time-unit'>
            {minutes} :

            </h1>  
            <h1 className='time-unit-small'>
             MIN

            </h1> 
            </div>
              <div className = 'time'>
            <h1 className='time-unit'>
            {seconds} :

            </h1>  
            <h1 className='time-unit-small'>
             SEC

            </h1> 
            </div>
           </div>

            </div>
            <div className='countdown'> 
                <h2  className ='cyber-text-cyan'font-family= 'Space Mono'>
                 Art and Music Drops </h2>
            </div>


            <div className='countdown'> 
                         <h1 className= 'cyber-text-h1'>WHAT IS MAYBEART?</h1>

            </div>
            
             <p className='par'>MAYBEART is a Solana-based token designed to empower artists and collectors. Holders can participate in auctions, mint NFTs and access exclusive art and music</p>
           </div>



           <div className='peices'> 
            {/* <div  >  */}
 
             <div className= 'time'> 

              <img
             className ='pic'
             
            //  src='https://drive.google.com/file/d/16APBJqQkTqRNonenb9vvJ5A0t-7z2Kr9/viewe84a1-76ec-4191-b042-5195245d8af9/DSC01299.jpg?format=2500w'/>
          // src = 'https://drive.google.com/file/d/16APBJqQkTqRNonenb9vvJ5A0t-7z2Kr9/view'/>
                src =  {Vitamin} alt='WF'/> 
                       <h2 className='pic-text'>VITAMIN LIVE RECORDING</h2>
                                              <p className='pic-text-desc'>John Butlers first Recording!</p>




             </div>

             <div className= 'time'> 

              <img
             className ='pic'
             
            //  src='https://images.squarespace-cdn.com/content/v1/632a11da57625f0c11cfd0c9/e46e84a1-76ec-4191-b042-5195245d8af9/DSC01299.jpg?format=2500w'/>
         src ={Cover}/>
                
                       <h2 className='pic-text'>VITAMIN RECORDING</h2>

                       <p className='pic-text-desc'>John Butlers first Recording!</p>




             </div>


             <div className= 'time'> 

              <img
             className ='pic'
             
            //  src='https://images.squarespace-cdn.com/content/v1/632a11da57625f0c11cfd0c9/e46e84a1-76ec-4191-b042-5195245d8af9/DSC01299.jpg?format=2500w'/>
                   src ={Diego2}/>
                
                       <h2 className='pic-text'>TOP MUSIC AND ART</h2>
                                               <p className='pic-text-desc'> Kalu James, Diego Rivera,  and More</p>

                     


             </div>
          
             
       {/* <img
             className ='pic'
             
             src='https://images.squarespace-cdn.com/content/v1/632a11da57625f0c11cfd0c9/e46e84a1-76ec-4191-b042-5195245d8af9/DSC01299.jpg?format=2500w'/>
       <img
             className ='pic'
             
             src='https://images.squarespace-cdn.com/content/v1/632a11da57625f0c11cfd0c9/e46e84a1-76ec-4191-b042-5195245d8af9/DSC01299.jpg?format=2500w'/>
  */}

            {/* </div> */}
             

             </div>
             {/* <div className= 'peices-desc'>
              
              <h2 className='pic-text'>VITAMIN LIVE RECORDING</h2>
                                     <p className='pic-text-desc'>John Butlers first Recording!</p>

                            <h2 className= 'pic-text'>VITAMIN STUDIO RECORDING</h2>
         <h3 className='pic-text'>Other top Music and Artworks</h3>
              
                </div> */}
 

            


 

           
          <div className='assets'> 
                <h2  className ='cyber-text-h2'font-family= 'Space Mono'>
                 BROWSE ASSETS</h2>
             <button className='gallery-button'> 
                    Gallery
                  </button>
                  
            </div>
            <div className ='peices'> 
              <div className='time'> 
                <img
       className ='pic'
       
      //  src ='https://www.instagram.com/p/BhS5gc8nYXz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D'/>

          src ='https://images.nightcafe.studio/ik-seo/jobs/oBLDwBFxM2XVyEt1m2i7/oBLDwBFxM2XVyEt1m2i7--1--4xbzq/giant-green-tiger-with-futuristic-girl-with-machine-gun-fighting-a-horde-of-zombies-postapocalyptic-.jpg?tr=w-1600,c-at_max'/>
              </div>

                <div className='time'> 
                <img
       className ='pic'
       
       src ='https://images.nightcafe.studio/jobs/S9UynfQA5zJeZoz1JiQ9/S9UynfQA5zJeZoz1JiQ9--0--brwp2.jpg?tr=w-1600,c-at_max'/>


              </div>

              <div className ='time'> 


                <img 
                className= 'pic'
                src ='https://images.nightcafe.studio/ik-seo/jobs/m9nH0Ue0KMjqkqmx2g3V/m9nH0Ue0KMjqkqmx2g3V--1--tvzzh/ehonda-with-giant-sushi.jpg?tr=w-1600,c-at_max'/>
              </div>

              <div className ='time'> 


                <img 
                className ='pic'
                // src ='https://images.nightcafe.studio/ik-seo/jobs/m9nH0Ue0KMjqkqmx2g3V/m9nH0Ue0KMjqkqmx2g3V--1--tvzzh/ehonda-with-giant-sushi.jpg?tr=w-1600,c-at_max'/>
                src ='https://images.nightcafe.studio/ik-seo/jobs/DCDMgSGLULLI1Z2ttpC2/DCDMgSGLULLI1Z2ttpC2--1--l2n82/geisha-girls-sitting-in-giant-bowl-of-ramen.jpg?tr=w-1600,c-at_max'/>
              </div>
               
                <div className ='time'> 
          <img className='pic' 
             src={Gorilla}/>




        </div>



                 
                 </div>
          
         
      </div>
      {/* <div className= 'peices'> 
        <div className ='time'> 
          <img className='pic' 
             src={Drag}/>




        </div>

 <div className ='time'> 
          <img className='pic' 
             src={Gorilla}/>




        </div>
         <div className ='time'> 
          <img className='pic' 
             src={Rhino}/>




        </div> */}








{/* 
      </div> */}
    </div>
  )
}
