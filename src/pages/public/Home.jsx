import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/home/Hero.jsx';
import WholesalePerksBar from '../../components/home/WholesalePerksBar.jsx';
import WholesaleCategories from '../../components/home/WholesaleCategories.jsx';
import FeaturedProducts from '../../components/home/FeaturedProducts.jsx';
import WholesaleCalculator from '../../components/home/WholesaleCalculator.jsx';
import QualityComplianceHub from '../../components/home/QualityComplianceHub.jsx';
import GlobalClientsTestimonials from '../../components/home/GlobalClientsTestimonials.jsx';
import Stats from '../../components/home/Stats.jsx';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>B&B Plastics | Direct B2B Wholesale Polymer Manufacturing</title>
        <meta name="description" content="Factory-direct wholesale plastic manufacturing company. We produce precision injection-molded containers, tubs, crates, bottles, and stands for distributors worldwide." />
      </Helmet>
      
      <Hero />
      <WholesalePerksBar />
      <WholesaleCategories />
      <FeaturedProducts />
      <WholesaleCalculator />
      <QualityComplianceHub />
      <GlobalClientsTestimonials />
      <Stats />
    </>
  );
};

export default Home;
