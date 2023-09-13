import style from "../../styles/style";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiReceiptRefund } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";
import { TbAddressBook } from "react-icons/tb";
import { MdOutlinePassword, MdOutlineTrackChanges } from "react-icons/md";
import { useAppDispatch } from "../../hooks";
import { logoutUserAsync } from "../../redux/features/User/userSlice";

interface IProps {
  setActiveTab: (prev: number) => void;
  activeTab: number;
}

export default function ProfileSidebar({ setActiveTab, activeTab }: IProps) {
  const userLinks = [
    { linkName: "Profile", icon: <RxPerson title="Profile" />, id: 1 },
    {
      linkName: "Orders",
      icon: <HiOutlineShoppingBag title="Orders" />,
      id: 2,
    },
    { linkName: "Refunds", icon: <HiReceiptRefund title="Refunds" />, id: 3 },
    {
      linkName: "Track orders",
      icon: <MdOutlineTrackChanges title="Track Orders" />,
      id: 4,
    },
    {
      linkName: "Change Password",
      icon: <MdOutlinePassword title="Change Password" />,
      id: 5,
    },
    { linkName: "address", icon: <TbAddressBook title="Address" />, id: 6 },
  ];

  const dispatch = useAppDispatch();

  return (
    <div className="bg-white shadow rounded-lg py-8 flex flex-col items-center md:items-start lg:block">
      {userLinks?.map((link, idx) => (
        <div
          key={idx}
          className={`${style.flex_normal} gap-3 cursor-pointer transition-all px-5 py-4 lg:px-12 hover:bg-orange-200`}
          onClick={() => setActiveTab(idx)}
        >
          <span
            className={`${activeTab === idx ? "text-orange-500" : ""} text-xl`}
          >
            {link.icon}
          </span>
          <span
            className={`${
              activeTab === idx ? "text-orange-500" : ""
            } capitalize hidden text-sm lg:text-base md:block`}
          >
            {link.linkName}
          </span>
        </div>
      ))}
      <div
        className={`${style.flex_normal} gap-3 cursor-pointer transition-all px-5 py-4 lg:px-12 hover:bg-orange-200`}
        onClick={() => dispatch(logoutUserAsync())}
      >
        <span
          className={`${
            activeTab === userLinks.length + 1 ? "text-orange-500" : ""
          } text-xl`}
        >
          <span
            className={`${
              activeTab === userLinks.length + 1 ? "text-orange-500" : ""
            } text-xl`}
          >
            <AiOutlineLogout title="Log out" />
          </span>
        </span>
        <span
          className={`${
            activeTab === userLinks.length + 1 ? "text-orange-500" : ""
          } capitalize hidden text-sm lg:text-base md:block`}
        >
          Log out
        </span>
      </div>
    </div>
  );
}
