import loadable from '@loadable/component';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const OngoingShopEvents = loadable(
  () => import('../../components/shop/ShopData/OngoingShopEvents')
);
const ShopProducts = loadable(() => import('../../components/shop/ShopData/ShopProducts'));
const ShopReviews = loadable(() => import('../../components/shop/ShopData/ShopReviews'));

interface IProps {
  isOwner: boolean;
}

export default function ShopProfileData({ isOwner }: IProps) {
  const [activeTab, setActiveTab] = useState('products');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center sticky top-0 left-0 z-30 bg-white shadow border-b py-4 px-6 ">
        <div className="w-full flex gap-6">
          <div
            className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-lg relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
              activeTab === 'products' ? 'after:w-full' : 'after:w-0'
            }`}
            onClick={() => handleTabClick('products')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTabClick('products');
              }
            }}
            role="button"
            tabIndex={0}>
            Shop Products
          </div>
          <div
            className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-lg relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
              activeTab === 'events' ? 'after:w-full' : 'after:w-0'
            }`}
            onClick={() => handleTabClick('events')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTabClick('events');
              }
            }}
            role="button"
            tabIndex={0}>
            Ongoing Events
          </div>
          <div
            className={`text-base font-medium lg:font-semibold cursor-pointer lg:text-lg relative py-1.5 after:bg-red-400 after:absolute after:left-0 after:bottom-0 after:h-1 ${
              activeTab === 'reviews' ? 'after:w-full' : 'after:w-0'
            }`}
            onClick={() => handleTabClick('reviews')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTabClick('reviews');
              }
            }}
            role="button"
            tabIndex={0}>
            Shop Reviews
          </div>
        </div>

        <div>
          {isOwner && (
            <Link to="/dashboard" className="">
              <button
                type="button"
                className="border-none bg-orange-500 text-white transition-all px-3 py-1.5 rounded-md hover:bg-orange-400 focus:bg-orange-500">
                Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="py-8 px-6">
        {activeTab === 'products' && <ShopProducts />}
        {activeTab === 'events' && <OngoingShopEvents />}
        {activeTab === 'reviews' && <ShopReviews />}
      </div>
    </div>
  );
}
