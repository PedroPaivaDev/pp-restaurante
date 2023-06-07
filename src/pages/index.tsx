// import Slider from "@/components/Slider";

import Contact from "@/components/Contact";
import SignIn from "@/components/Forms/SignIn";

export default function Home() {  
  return (
    <div className="page">
      <div className="container">
        <SignIn/>
        <Contact/>
      </div>
    </div>
  )
}
