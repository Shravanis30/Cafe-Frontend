// src/pages/Profile.jsx
import React from 'react';
import { FaClock, FaMapMarkerAlt, FaCreditCard, FaGift, FaBell, FaQuestionCircle, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#2d240f] text-white p-4">
      <h2 className="text-center text-xl font-bold mb-6">My Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img src="https://i.pravatar.cc/100" alt="user" className="w-16 h-16 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">Satwik Singh</h3>
          <p className="text-sm text-gray-300">singhrajput0912@gmail.com</p>
        </div>
      </div>

      <div className="space-y-4">
        <ProfileItem icon={<FaClock />} text="My Orders" />
        <ProfileItem icon={<FaMapMarkerAlt />} text="Saved Addresses" />
        <ProfileItem icon={<FaCreditCard />} text="Payment Methods" />
        <ProfileItem icon={<FaGift />} text="Offers & Coupons" />
        <ProfileItem icon={<FaBell />} text="Notification Settings" />
        <ProfileItem icon={<FaQuestionCircle />} text="Help & Support" />
        <ProfileItem icon={<FaInfoCircle />} text="About Cafe" />
        <ProfileItem icon={<FaSignOutAlt />} text="Logout" />
      </div>

      <p className="text-center text-gray-400 mt-8 text-xs">Version: v1.0.0</p>
    </div>
  );
};

const ProfileItem = ({ icon, text }) => (
  <div className="flex items-center justify-between bg-[#3b3117] p-3 rounded">
    <div className="flex items-center gap-3">
      <div className="text-[#f5e7c3]">{icon}</div>
      <span>{text}</span>
    </div>
    <span className="text-[#f5e7c3]">&rarr;</span>
  </div>
);

export default Profile;
