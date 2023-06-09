// import Slider from "@/components/Slider";

import Contact from "@/components/Contact";
import SignIn from "@/components/Forms/SignIn";

export default function Home() {  
  return (
    <div className="page">
      <div className="container">
        <div className="envelope animeLeft">
          <SignIn/>
          <Contact/>
        </div>
      </div>
    </div>
  )
}
