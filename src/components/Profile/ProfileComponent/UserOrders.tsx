import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import formatPrice from '../../../helper/formatPrice';
import { selectUser } from '../../../redux/features/User/userSlice';
import {
  getAllOrdersOfUserAsnyc,
  selectUserOrders,
} from '../../../redux/features/Orders/orderSlice';

export default function UserOrders() {
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const userOrders = useAppSelector(selectUserOrders);

  useEffect(() => {
    if (user) {
      dispatch(getAllOrdersOfUserAsnyc(user?._id));
    }
  }, [user, dispatch]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      flex: 0.7,
      cellClassName: (params: any) => {
        return params.value.status === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 100,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 100,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 130,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <Link to={`/order/${params.id}`}>
            <button
              type="button"
              className="hover:bg-gray-200 bg-transparent rounded py-1.5 px-4 transition-all">
              <AiOutlineArrowRight size={20} />
            </button>
          </Link>
        );
      },
    },
  ];

  const rows: {
    id: string;
    itemsQty: number;
    total: string;
    status: string;
  }[] = [];

  if (userOrders) {
    userOrders.forEach((item) => {
      rows.push({
        id: item?._id,
        itemsQty: item?.cart?.length,
        total: formatPrice(item.totalPrice),
        status: item.orderStatus,
      });
    });
  }

  return (
    <div>
      <DataGrid rows={rows} columns={columns} autoHeight />
    </div>
  );
}
