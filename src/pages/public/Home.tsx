import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/home/Hero.js';
import WholesalePerksBar from '../../components/home/WholesalePerksBar.js';
import WholesaleCategories from '../../components/home/WholesaleCategories.js';
import FeaturedProducts from '../../components/home/FeaturedProducts.js';
import WholesaleCalculator from '../../components/home/WholesaleCalculator.js';
import QualityComplianceHub from '../../components/home/QualityComplianceHub.js';
import GlobalClientsTestimonials from '../../components/home/GlobalClientsTestimonials.js';
import Stats from '../../components/home/Stats.js';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>B&B Plastics | Direct B2B Wholesale Polymer Manufacturing</title>
        <meta
          name="description"
          content="Factory-direct wholesale plastic manufacturing company. We produce precision injection-molded containers, tubs, crates, bottles, and stands for distributors worldwide."
        />
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
