import Footer from '@/src/utils/Footer'
import TourHero from '@/src/components/TourArchive/TourHero'
import Navbar from '@/src/utils/Navbar'
import ProductsShowcase from '@/src/components/Home/ProductsShowcase'
import TourArchiveCTA from '@/src/components/TourArchive/TourArchiveCTA'
import TourArchiveFAQ from '@/src/components/TourArchive/TourArchiveFAQS'

export default function page(){
    return (
        <div>
          <Navbar/>
          <TourHero/>
          <ProductsShowcase/>
          <TourArchiveCTA/>
          <TourArchiveFAQ/>
          <Footer/>

        </div>
    )
}