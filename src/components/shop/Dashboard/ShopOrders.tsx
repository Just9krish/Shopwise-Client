import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { formattedPrice } from '../../../helper/formatPrice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Loader from '../../Loader/Loader';
import { selectShop, selectShopLoading } from '../../../redux/features/Shop/shopSlice';
import {
  getAllOrdersOfShopAsync,
  selectShopOrders,
} from '../../../redux/features/Orders/orderSlice';

type Row = {
  id: string;
  itemsQty: number;
  total: string;
  status: string;
};

export default function ShopOrders() {
  const shop = useAppSelector(selectShop);
  const isShopLoading = useAppSelector(selectShopLoading);
  const shopOrders = useAppSelector(selectShopOrders);

  console.log(shopOrders);

  const dispatch = useAppDispatch();

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params: GridCellParams) => {
        return params.value == 'Delivered' ? 'greenColor' : 'redcolor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,

      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Link to={`/shop-orders/${params.id}`}>
              <button>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row: Row[] = [];

  shopOrders.forEach((order) => {
    row.push({
      id: order._id,
      itemsQty: order.cart.reduce((acc, item) => acc + item.quantity, 0),
      total: formattedPrice(order.totalPrice),
      status: order.orderStatus,
    });
  });

  useEffect(() => {
    if (shop) dispatch(getAllOrdersOfShopAsync(shop._id));
  }, [shop?._id]);

  return (
    <>
      {isShopLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-[100%] lg:mx-8 pt-1 lg:mt-10 bg-white overflow-x-scroll">
            <DataGrid rows={row} columns={columns} autoHeight />
          </div>
        </>
      )}
    </>
  );
}
