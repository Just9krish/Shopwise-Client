import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import formatPrice from '../../../helper/formatPrice';
import { ICoupon } from '../../../Interface';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { API_URL } from '../../../constant';
import { selectShop } from '../../../redux/features/Shop/shopSlice';
import {
  getShopProductsAsync,
  selectShopProducts,
} from '../../../redux/features/Products/productSlice';

interface Row {
  id: string;
  name: string;
  discountpercentage: string;
  minamt: string;
}

export default function ShopCupons() {
  const dispatch = useAppDispatch();
  const shop = useAppSelector(selectShop);

  const [coupons, setCoupon] = useState([]);
  const [error, setError] = useState<string | null>(null);

  async function getCoupons(shopId: string) {
    try {
      const res = await axios.get(API_URL.GET_SHOP_COUPONS(shopId), {
        withCredentials: true,
      });

      if (res.status === 200) {
        setCoupon(res.data.coupons);
      }
    } catch (e: any) {
      if (e.response) {
        setError(e.response.data.message);
      } else {
        setError(e.message);
      }
    }
  }

  async function handleDeleteCoupon(shopId: string, id: string) {
    try {
      const res = await axios.delete(API_URL.DELETE_SHOP_COUPON(shopId, id), {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        getCoupons(shop!._id);
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [cuponcode, setCuponcode] = useState('');
  const [discountpercentage, setDiscountpercentage] = useState(0);
  const [miniamount, setMiniAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const shopProducts = useAppSelector(selectShopProducts);
  // const { products } = useAppSelector((state) => state.products);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post(
        API_URL.CREATE_SHOP_COUPON(shop!._id),
        {
          name: cuponcode,
          value: discountpercentage,
          minAmount: miniamount,
          selectedProduct,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setIsOpen(!isOpen);
        setCuponcode('');
        setDiscountpercentage(0);
        setMiniAmount(0);
        setSelectedProduct(null);
        getCoupons(shop!._id);
        toast.success(res.data.message);
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }

  useEffect(() => {
    if (shop?._id) {
      dispatch(getShopProductsAsync(shop._id));
      getCoupons(shop._id);
    }
  }, [shop, dispatch]);

  const columns = [
    {
      field: 'id',
      headerName: 'Coupon Id',
      minWidth: 260,
      flex: 0.7,
    },
    {
      field: 'name',
      headerName: 'Coupon Name',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'discountpercentage',
      headerName: 'Discount Percentage',
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: 'minamt',
      headerName: 'Minimum Amount',
      minWidth: 80,
      flex: 0.6,
    },
    {
      field: 'Delete',
      flex: 0.8,
      minWidth: 100,
      headerName: 'Delete',
      type: 'number',
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <button
            type="button"
            onClick={() => handleDeleteCoupon(shop!._id, params.id.toString())}
            className="hover:bg-gray-200 bg-transparent rounded py-1.5 px-4 transition-all">
            <AiOutlineDelete size={20} />
          </button>
        );
      },
    },
  ];

  const row: Row[] = [];

  coupons?.forEach((item: ICoupon) => {
    row.push({
      id: item._id,
      name: item.name,
      discountpercentage: `${item.value}%`,
      minamt: formatPrice(item.minAmount),
    });
  });

  return error ? (
    <h1>{error}</h1>
  ) : (
    <div className="flex flex-col w-full">
      <button
        type="button"
        className="bg-green-500 mb-8 text-white px-3 py-1.5 self-end mr-8 rounded"
        onClick={() => setIsOpen(!isOpen)}>
        Add Cuopon Code
      </button>
      <DataGrid rows={row} columns={columns} autoHeight disableRowSelectionOnClick />
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-25 flex justify-center h-screen items-center">
          <div className="bg-white rounded w-full shadow py-4 px-8 lg:w-2/5 relative">
            <div className="flex justify-end">
              <RxCross1 onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" size={25} />
            </div>
            <div className="py-4">
              <h4 className="font-Poppins text-3xl text-center">Create Cuopon Code</h4>
              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div>
                  <label className="text-sm md:text-base" htmlFor="cuponcode">
                    Cuopon Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                    id="cuponcode"
                    name="cuponcode"
                    value={cuponcode}
                    onChange={(e) => setCuponcode(e.target.value)}
                    required
                    placeholder="Enter your cupon code name"
                  />
                </div>
                <div>
                  <label className="text-sm md:text-base" htmlFor="discountpercentage">
                    Discount Percentage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                    id="discountpercentage"
                    name="discountpercentage"
                    required
                    min={0}
                    max={90}
                    value={discountpercentage}
                    onChange={(e) => setDiscountpercentage(parseInt(e.target.value, 10))}
                    maxLength={2}
                    placeholder="Enter discount percentage"
                  />
                </div>

                <div>
                  <label className="text-sm md:text-base" htmlFor="miniamount">
                    Minimum Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                    id="miniamount"
                    name="miniamount"
                    min={0}
                    value={miniamount}
                    onChange={(e) => setMiniAmount(parseInt(e.target.value, 10))}
                    required
                    placeholder="Enter your product name"
                  />
                </div>
                <div>
                  <label className="text-sm md:text-base" htmlFor="productcategory">
                    Product Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full mt-2 border h-9 rounded bg-gray-50 text-sm md:text-base px-3 py-1.5"
                    name="productCategory"
                    id="productcategory"
                    value={selectedProduct || ''}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required>
                    <option disabled selected>
                      Choose a Product
                    </option>
                    {shopProducts?.map((product) => (
                      <option value={product._id} key={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Add Cuopon Code"
                    className="bg-orange-500 py-1 px-3 text-white rounded-md shadow-sm cursor-pointer "
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
