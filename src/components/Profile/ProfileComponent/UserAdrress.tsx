import loadable from '@loadable/component';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import style from '../../../styles/style';
import {
  clearUserError,
  clearUserMessage,
  deleteUserAddressAsync,
  selectUser,
  selectUserError,
  selectUserMessage,
} from '../../../redux/features/User/userSlice';

const AddAddress = loadable(() => import('./AddAddress'));

export default function UserAdrress() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useAppSelector(selectUser);
  const message = useAppSelector(selectUserMessage);
  const userError = useAppSelector(selectUserError);

  const { addresses } = user!;

  const dispatch = useAppDispatch();

  function handleModalOpen() {
    setIsModalOpen(!isModalOpen);
  }

  function handleDeleteAddress(addressId: string) {
    dispatch(deleteUserAddressAsync(addressId));
  }

  useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch(clearUserError());
    }
    if (message) {
      toast.success(message);
      setIsModalOpen(false);
      dispatch(clearUserMessage());
    }
  }, [userError, message, dispatch]);

  return (
    <div className="w-full px-5">
      {isModalOpen && <AddAddress handleModalOpen={() => handleModalOpen()} />}
      <div className={`w-full ${style.flex_normal} justify-between`}>
        <h1 className="text-[#000000ba] pb-2 text-2xl">Saved Addresses</h1>

        <button type="button" className={`${style.button} text-white`} onClick={handleModalOpen}>
          <span className="mr-1">
            <MdOutlineAdd size={25} />
          </span>
          Add New
        </button>
      </div>

      <div className="space-y-10 mt-6 py-3">
        {addresses.length > 0 ? (
          addresses?.map((address) => (
            <div
              key={address._id}
              className={`w-full rounded ${style.flex_normal} justify-between bg-gray-100 shadow py-4 px-8`}>
              <div className={`${style.flex_normal}`}>
                <h4 className="font-semibold">{address.addressType}</h4>
              </div>
              <div className={`${style.flex_normal} gap-4`}>
                <h4>{`${address.address1} ${address.address2}`}</h4>
              </div>
              <div className={`${style.flex_normal} gap-4`}>
                <h4>{user?.primaryPhoneNumber}</h4>
              </div>
              <button type="button" onClick={() => handleDeleteAddress(address._id)}>
                <AiOutlineDelete className="cursor-pointer" size={25} title="Delete Address" />
              </button>
            </div>
          ))
        ) : (
          <h4 className="text-center text-xl pt-4 text-gray-800">
            You do not have any saved addresses.
          </h4>
        )}
      </div>
    </div>
  );
}
