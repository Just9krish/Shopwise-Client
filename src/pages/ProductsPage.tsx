import loadable from '@loadable/component';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { PiFunnelLight } from 'react-icons/pi';
import { useAppDispatch, useAppSelector } from '../hooks';
import categories from '../constant/categories.json';
import brands from '../constant/brands.json';
import {
  getAllProductsByFiltersAsync,
  selectProducts,
  selectTotalProducts,
} from '../redux/features/Products/productSlice';
import { PRODUCT_PER_PAGE } from '../constant';
import Pagination from '../components/Pagination/Pagination';
import { Category, Filter, Section, IFilter } from '../redux/features/Products/interface';

const ProductGrid = loadable(() => import('../components/ProductGrid/ProductGrid'));
const DesktopFilter = loadable(() => import('../components/FilterSection/DesktopFilter'));
const MobileFilter = loadable(() => import('../components/FilterSection/MobileFilter'));

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
];

const filters: IFilter[] = [
  {
    id: 'category',
    name: 'Category',
    options: categories,
  },
  {
    id: 'brand',
    name: 'Brands',
    options: brands,
  },
];

export default function ProductsPage() {
  const products = useAppSelector(selectProducts);
  const totalProducts = useAppSelector(selectTotalProducts);
  const dispatch = useAppDispatch();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  function handleSort(option: { sort: string; order: string }) {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>, section: Section, option: Category) => {
    const newFilter: Filter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id]!.push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const values = newFilter[section.id];
      if (values) {
        const index = values.findIndex((el) => el === option.value);
        if (index !== -1) {
          values.splice(index, 1);
        }
      }
    }
    setFilter(newFilter);
  };

  const handlePage = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: PRODUCT_PER_PAGE };
    dispatch(getAllProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, sort, page, filter]);

  return (
    <div>
      <MobileFilter
        filters={filters}
        handleFilter={handleFilter}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <BsChevronDown
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleSort(option)}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm cursor-pointer w-full text-left'
                            )}>
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
              <span className="sr-only">View grid</span>
              <HiOutlineSquares2X2 className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}>
              <span className="sr-only">Filters</span>
              <PiFunnelLight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <DesktopFilter handleFilter={handleFilter} filters={filters} />
            <div className="lg:col-span-3">
              <ProductGrid products={products} />
            </div>
          </div>
        </section>

        {/* Pagination */}
        <Pagination page={page} handlePage={handlePage} totalProducts={totalProducts} />
      </main>
    </div>
  );
}
