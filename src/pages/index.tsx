import Slider from "@/components/Slider";

export default function Home() {  
  return (
    <div className="page">
      <div className="container">
        <div className="envelope">
          <div className="wrapper">
            <Slider images={[
              'https://raw.githubusercontent.com/PedroPaivaDev/la-petra/main/src/assets/products/1-bombomMorangoCoco.jpeg',
              'https://raw.githubusercontent.com/PedroPaivaDev/la-petra/main/src/assets/products/10-cookieChocolate.jpeg'
            ]}/>
          </div>
        </div>
      </div>
    </div>
  )
}
