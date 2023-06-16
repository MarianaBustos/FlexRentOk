import './footer.css'


export const Footer = () => {
  return (
    <>
    
 <div className='footer' style={ {width:"100%", height:"50px", justifyContent:"space-evenly",alignItems:"center"}}>
        <div className='letrasFlexRent fooooot' style={{color:"white"}}>© 2023 FlexRent, Inc.</div>
        <div className='icon'>
          <img src="/assets/images/Footer/twitter.png" alt="" /><img src="/assets/images/Footer/linkedin.png" alt="" /><img src="/assets/images/Footer/face.png" alt="" />
        </div>
        <div ><a className='fooooot' style={{marginLeft:"10px", color:"white"}} href="">Privacy</a><a className='fooooot' style={{marginLeft:"10px",color:"white"}} href="">Conditions</a><a className='fooooot' style={{marginLeft:"10px",color:"white"}} href="">Site map </a><a className='fooooot' style={{marginLeft:"10px",color:"white"}} href="">About us</a></div>
       </div>

    </>
  )
}
