import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="grid grid-cols-[1fr_2fr_2fr_2fr]">
        <div className="container mx-auto">
          <div className="flex items-center">
            <a className="block  h-11 w-11 rounded-full overflow-hidden">
              <img src="../src/assets/images/addis_abab_logo.jpg" alt="Addis Ababa Logo" />
            </a>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Dedicated to serving the citizens of Addis Ababa with timely information and reliable services.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">News & Events</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Address: Meskel Square, Addis Ababa</li>
              <li>Phone: +251 11 123 4567</li>
              <li>Email: info@addisababa.gov</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://web.facebook.com/MayorOfficeAA/" className="hover:underline">Facebook</a></li>
              <li><a href="https://x.com/mayoraddisababa" className="hover:underline">Twitter</a></li>
              <li><img></img><a href="https://www.youtube.com/@mayorsofficeofaddisababa2969" className="hover:underline">Youtube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          &copy; 2024 Addis Ababa City Administration. All Rights Reserved.
        </div>
      </div>
    </footer >
  );
};
export default Footer;

