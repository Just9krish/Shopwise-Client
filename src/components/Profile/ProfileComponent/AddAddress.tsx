import { RxCross1 } from 'react-icons/rx';
import { Country, State } from 'country-state-city';
import { HiOutlineOfficeBuilding, HiOutlineGlobeAlt, HiOutlineHome } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import style from '../../../styles/style';
import { useAppDispatch } from '../../../hooks';
import { updateUserAddressAsync } from '../../../redux/features/User/userSlice';

interface Props {
  handleModalOpen: () => void;
}

export default function AddAddress({ handleModalOpen }: Props) {
  const ADDRESSTYPE = [
    {
      name: 'Home',
      icon: <HiOutlineHome className="mr-1" />,
    },
    {
      name: 'Office',
      icon: <HiOutlineOfficeBuilding className="mr-1" />,
    },
    {
      name: 'Others',
      icon: <HiOutlineGlobeAlt className="mr-1" />,
    },
  ];

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const selectedCountry = watch('country');
  const dispatch = useAppDispatch();

  return (
    <div
      className="fixed w-full h-screen bg-black top-0 left-0 flex items-center justify-center z-[9999]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="w-full max-w-[600px] overflow-y-scroll bg-white shadow px-8 py-12 rounded">
        <div className="flex justify-between">
          <h2 className="text-2xl font-Poppins">Add New Address</h2>
          <button type="button" onClick={handleModalOpen}>
            <RxCross1 size={30} />
          </button>
        </div>
        <div className="mt-7">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              const address = {
                country: data.country,
                state: data.state,
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
                zipcode: parseInt(data.zipcode, 10),
                addressType: data.addressType,
              };

              dispatch(updateUserAddressAsync(address));
            })}
            className="space-y-6">
            <div className="w-full flex flex-wrap gap-4 justify-between items-start">
              <div className="w-2/5">
                <label htmlFor="country" className="block pb-1">
                  Choose your Country:
                </label>
                <select
                  {...register('country', {
                    required: 'Country name is required!',
                  })}
                  className="bg-gray-50 text-sm md:text-base px-3 py-1.5 border rounded"
                  id="country"
                  aria-invalid={errors.country ? 'true' : 'false'}>
                  <option disabled selected value="">
                    Select your country
                  </option>
                  {Country.getAllCountries()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((country) => (
                      <option value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm italic">
                    {errors.country.message?.toString()}
                  </p>
                )}
              </div>
              <div className="w-2/5">
                <label className="block pb-1" htmlFor="zipcode">
                  Zip Code:
                </label>
                <input
                  type="number"
                  id="zipcode"
                  className={`${style.input}`}
                  aria-invalid={errors.zipcode ? 'true' : 'false'}
                  placeholder="Zip Code (Required)*"
                  {...register('zipcode', {
                    required: 'Zip Code is required!',
                  })}
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm italic">
                    {errors.zipcode.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex gap-4 flex-wrap justify-between items-center">
              <div className="w-2/5">
                <label htmlFor="state" className="block pb-1 ">
                  Choose your State:
                </label>
                <select
                  className="bg-gray-50 text-sm md:text-base px-3 py-1.5 border rounded"
                  id="state"
                  {...register('state', {
                    required: 'State is required!',
                  })}
                  aria-invalid={errors.state ? 'true' : 'false'}>
                  <option selected disabled value="">
                    Select your State
                  </option>
                  {State.getStatesOfCountry(selectedCountry)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((state) => (
                      <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm italic">{errors.state.message?.toString()}</p>
                )}
              </div>

              <div className="w-2/5">
                <p className="block pb-1">Select Address Type:</p>
                <div className={`${style.flex_normal} gap-2`}>
                  {ADDRESSTYPE?.map((addressType) => (
                    <button
                      type="button"
                      key={addressType.name}
                      onClick={() => setValue('addressType', addressType.name)}
                      className={`${
                        watch('addressType') === addressType.name ? 'bg-orange-500 text-white' : ''
                      } flex items-center py-1 px-2 text-xs rounded border`}>
                      {addressType.icon}
                      {addressType.name}
                    </button>
                  ))}
                </div>
                {errors.addressType && (
                  <span className="text-red-500 text-sm italic">
                    {errors.addressType.message?.toString()}
                  </span>
                )}
                {/* Hidden input field to store the selected address type */}
                <input
                  type="hidden"
                  aria-invalid={errors.addressType ? 'true' : 'false'}
                  {...register('addressType', {
                    required: 'Address type is required! ',
                  })}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block pb-1" htmlFor="address1">
                Address 1:
              </label>
              <input
                type="text"
                id="address1"
                className={`${style.input} w-full`}
                placeholder="House No., Building Name (Required)*"
                aria-invalid={errors.address1 ? 'true' : 'false'}
                {...register('address1', {
                  required: 'Address 1 is required!',
                })}
              />
              {errors.address1 && (
                <span className="text-red-500 text-sm italic">
                  {errors.address1.message?.toString()}
                </span>
              )}
            </div>

            <div className="w-full">
              <label className="block pb-1" htmlFor="address2">
                Address 2:
              </label>
              <input
                type="text"
                id="address2"
                className={`${style.input} w-full`}
                aria-invalid={errors.address2 ? 'true' : 'false'}
                placeholder="Road Name, Area, Colony (Required)*"
                {...register('address2', {
                  required: 'Address 2 is required!',
                  pattern: {
                    value: /^([^0-9]*)$/,
                    message: 'Not a valid addresss!',
                  },
                })}
              />
              {errors.address2 && (
                <span className="text-red-500 text-sm italic">
                  {errors.address2.message?.toString()}
                </span>
              )}
            </div>

            <div className="w-full">
              <label className="hidden md:block pb-1" htmlFor="address3">
                Address 3:
              </label>
              <input
                type="text"
                id="address3"
                className={`${style.input} w-full`}
                placeholder="Nearby Famous Shop/Mall/Landmark"
                {...register('address3', {
                  pattern: {
                    value: /^([^0-9]*)$/,
                    message: 'Not a valid addresss!',
                  },
                })}
              />
              {errors.address3 && (
                <span className="text-red-500 text-sm italic">
                  {errors.address3.message?.toString()}
                </span>
              )}
            </div>

            <div>
              <input
                type="submit"
                value="Submit"
                className="cursor-pointer px-4 py-1 bg-green-700 text-white shadow-sm rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
