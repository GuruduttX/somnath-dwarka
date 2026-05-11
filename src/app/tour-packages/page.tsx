import Footer from '@/utils/Footer'
import TourHero from '@/components/TourArchive/TourHero'
import Navbar from '@/utils/Navbar'
import ProductsShowcase from '@/components/Home/ProductsShowcase'

export default function page(){
    return (
        <div>
          <Navbar/>
          <TourHero/>
          <ProductsShowcase/>
          <Footer/>

        </div>
    )
}