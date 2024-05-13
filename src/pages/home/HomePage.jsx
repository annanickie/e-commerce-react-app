import { useContext } from "react";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
// import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const HomePage = () => {
    {/*const context = useContext(myContext);
    const name = context*/}
    return (
        <Layout>
            <HeroSection/>
            <Category/><br></br>
            <h1 className="text-red-600 font-bold text-3xl tracking-wide text-center">20% DISCOUNT on all Products!!!!!</h1>
            <HomePageProductCard/>
            <Track/>
            {/* <Testimonial/> */}
            {/* <Loader></Loader> */}
        </Layout>
    );
}

export default HomePage;
