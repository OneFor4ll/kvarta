import Delivery from "./components/Delivery";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LeadForm from "./components/LeadForm";
import Products from "./components/Products";
import Story from "./components/Story";
import Subscription from "./components/Subscription";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Subscription />
        <Story />
        <Delivery />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
