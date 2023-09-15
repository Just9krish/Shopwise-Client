import loadable from '@loadable/component';

const TrackUserOrder = loadable(() => import('./ProfileComponent/TrackUserOrder'));
const UserAdrress = loadable(() => import('./ProfileComponent/UserAdrress'));
const UserOrders = loadable(() => import('./ProfileComponent/UserOrders'));
const UserPasswordChange = loadable(() => import('./ProfileComponent/UserPasswordChange'));
const UserProfile = loadable(() => import('./ProfileComponent/UserProfile'));
const UserRefunds = loadable(() => import('./ProfileComponent/UserRefunds'));

interface IProps {
  activeTab: number;
}

export default function ProfileContent({ activeTab }: IProps) {
  return (
    <div className="w-full bg-white rounded-md shadow py-8 px-6 min-h-[428px] lg:min-h-[456px]">
      {activeTab === 1 && <UserProfile />}
      {activeTab === 2 && <UserOrders />}
      {activeTab === 3 && <UserRefunds />}
      {activeTab === 4 && <TrackUserOrder />}
      {activeTab === 5 && <UserPasswordChange />}
      {activeTab === 6 && <UserAdrress />}
    </div>
  );
}
