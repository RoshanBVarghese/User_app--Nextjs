"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import '../styles/dashboard.css'
import Image from "next/image";
import dt1 from '../images/dt1.jpg'
import dt2 from '../images/dt2.jpg'

const Dashboard = () => {
  const router = useRouter();

  const user = Cookies.get('user');
  if (!user) {
    router.push('/login');
    return null;
  }

  const parsedUser = JSON.parse(user);

  // Log user data for debugging

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-center">Welcome, {parsedUser.username}</h1>
        <p>A restaurant is a business that prepares and serves food and drinks to customers.<br></br>
          Meals are generally served and eaten on the premises, but many restaurants also offer take-out and food delivery services.<br></br>
          Restaurants vary greatly in appearance and offerings, including a wide variety of cuisines and service models ranging from inexpensive fast-food restaurants and cafeterias to mid-priced family restaurants.<br></br>
          The earliest modern-format "restaurants" to use that word in Paris were the establishments which served bouillon, a broth made of meat and egg which was said to restore health and vigour.<br></br>
          The first restaurant of this kind was opened in 1765 or 1766 by Mathurin Roze de Chantoiseau on rue des Poulies, now part of the Rue de Louvre.<br></br>
          In the Western world, the concept of a restaurant as a public venue where waiting staff serve patrons food from a fixed menu is a relatively recent one, dating from the late 18th century.
        </p>
          <div className="row justify-content-end">
          <div className="col-md-6">
            <div className="image-container">
              <Image src={dt1} alt={"Hotel 1"} priority/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image-container2">
              <Image src={dt2} alt={"Hotel 2"} priority/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
