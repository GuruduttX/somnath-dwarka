import BlogArchiveHero from "@/src/components/BlogArchive/BlogHero";
import Navbar from "@/src/utils/Navbar";
import Footer from "@/src/utils/Footer";
import BlogList from "@/src/components/BlogArchive/BlogList";
import BlogCTA from "@/src/components/Blog/BlogCTA";


export default function page(){
    return (
        <>
          <Navbar/>
          <div>
            <BlogArchiveHero/>
            <BlogList/>
            <BlogCTA/>
          </div>
          <Footer/>
          
        </>
    )
}