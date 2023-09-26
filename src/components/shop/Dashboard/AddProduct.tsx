import { ChangeEvent } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import calculateDiscountPrice from '../../../helper/calculateDiscountPrice';
import categoriesData from '../../../constant/categories.json';
import brandsData from '../../../constant/brands.json';
import { useAppDispatch } from '../../../hooks';
import { addShopProductAsync } from '../../../redux/features/Products/productSlice';

export interface IAddProduct {
  productName: string;
  productDescription: string;
  productImages: any[];
  productCategory: string;
  productBrand: string;
  productTags: string;
  productPrice: number;
  productDiscountPrice: number;
  productDiscountPercentage: number;
  productStock: number;
}

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<IAddProduct>({
    defaultValues: {
      productImages: [],
      productPrice: 1,
      productDiscountPercentage: 1,
      productName: '',
      productDescription: '',
      productCategory: '',
      productBrand: '',
      productTags: '',
      productDiscountPrice: 0,
      productStock: 1,
    },
  });

  const productPrice = watch('productPrice');
  const productDiscountPercentage = watch('productDiscountPercentage');
  const discountPrice = calculateDiscountPrice(productPrice, productDiscountPercentage);
  const productImages = watch('productImages');
  const dispatch = useAppDispatch();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from((e.target.files || []) as File[]);

    if (selectedFiles.length + productImages.length > 5) {
      toast.info('You can only select up to 5 images.');
      return;
    }

    setValue('productImages', [...productImages, ...selectedFiles]);
  };

  const removeImage = (index: number) => {
    const currentImages = getValues('productImages');
    currentImages.splice(index, 1);
    setValue('productImages', [...currentImages]);
  };

  const onSubmit = (data: IAddProduct) => {
    const form = new FormData();

    productImages.forEach((img) => {
      form.append('images', img);
    });

    form.append('name', data.productName);
    form.append('description', data.productDescription);
    form.append('category', data.productCategory);
    form.append('brand', data.productBrand);
    form.append('tags', data.productTags);
    form.append('price', data.productPrice.toString());
    form.append('discountPercentage', data.productDiscountPercentage.toString());
    form.append('discountPrice', discountPrice.toString());
    form.append('stock', data.productStock.toString());

    dispatch(addShopProductAsync(form));
  };

  return (
    <div className="w-full lg:w-3/5 p-8">
      <h4 className="text-3xl font-Poppins text-center">Add Product</h4>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <div>
          <label className="text-sm md:text-base" htmlFor="productname">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            {...register('productName', {
              valueAsNumber: false,
              required: 'Product name is required',
            })}
            placeholder="Enter your product name"
          />
          {errors?.productName && (
            <span className="text-red-500 text-sm">{errors.productName.message?.toString()}</span>
          )}
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="productdescription">
            Product Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productdescription"
            {...register('productDescription', {
              required: 'Product description is required',
              minLength: {
                value: 200,
                message: 'Product description should be at least 200 characters long',
              },
            })}
            placeholder="Enter your product Description"
          />
          {errors?.productDescription && (
            <span className="text-red-500 text-sm">
              {errors.productDescription.message?.toString()}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="productcategory">
            Product Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-9 rounded bg-gray-50 text-sm md:text-base px-3 py-1.5"
            id="productcategory"
            {...register('productCategory', {
              required: 'Product category is required',
            })}>
            <option disabled selected>
              Choose a Category
            </option>
            {categoriesData?.map((category) => (
              <option value={category.value} key={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors?.productCategory && (
            <span className="text-red-500 text-sm">
              {errors.productCategory.message?.toString()}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="productcategory">
            Product Brands <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-9 rounded bg-gray-50 text-sm md:text-base px-3 py-1.5"
            id="productcategory"
            {...register('productBrand', {
              required: 'Product bran is required',
            })}>
            <option disabled selected>
              Choose a Brand
            </option>
            {brandsData?.map((brand) => (
              <option value={brand.value} key={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>
          {errors?.productBrand && (
            <span className="text-red-500 text-sm">{errors.productBrand.message?.toString()}</span>
          )}
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produttags">
            Product Tags
          </label>
          <input
            type="text"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="producttags"
            {...register('productTags')}
            placeholder="Enter your product tags"
          />
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produtprice">
            Product Price (in paisa) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="productprice"
            {...register('productPrice', {
              required: 'Product price is required',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Product price should be greater than 0',
              },
            })}
            placeholder="Enter your product price"
          />
          {errors?.productPrice && (
            <span className="text-red-500 text-sm">{errors.productPrice.message?.toString()}</span>
          )}
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produtdiscountpercentage">
            Product Discount (between 1-90 in percentage(%))
          </label>
          <input
            type="number"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtdiscountpercentage"
            {...register('productDiscountPercentage', {
              required: 'Product discount percentage is required',
              valueAsNumber: true,
              max: {
                value: 90,
                message: 'Product discount percentage should be less than 90',
              },
              min: {
                value: 1,
                message: 'Product discount percentage should be greater than 0',
              },
              maxLength: {
                value: 2,
                message: 'Product discount percentage should be less than 90',
              },
            })}
            placeholder="Enter your product discount percentage"
          />
          {errors?.productDiscountPercentage && (
            <span className="text-red-500 text-sm">
              {errors.productDiscountPercentage.message?.toString()}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produtdiscountprice">
            Product Discount Price (in paisa)
          </label>
          <input
            type="number"
            readOnly
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtdiscountpercentage"
            value={discountPrice}
            {...register('productDiscountPrice')}
          />
          {errors?.productDiscountPrice && (
            <span className="text-red-500 text-sm">
              {errors.productDiscountPrice.message?.toString()}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm md:text-base" htmlFor="produtstock">
            Stocks of Product <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="appearance-none block w-full px-3 mt-1 h-9 border border-gray-300 rounded placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            id="produtstock"
            {...register('productStock', {
              required: 'Product stock is required',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Product stock should be greater than 0',
              },
            })}
          />
          {errors?.productStock && (
            <span className="text-red-500 text-sm">{errors.productStock.message?.toString()}</span>
          )}
        </div>

        <div>
          <label htmlFor="productdimages" className="text-sm md:text-base">
            Upload Images (max 5 images) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="productdimages"
            name="productImages"
            multiple
            required
            onChange={handleImageChange}
          />
          <div className="flex items-center mt-2 gap-1 overflow-x-scroll whitespace-nowrap">
            {getValues('productImages').length < 5 && (
              <label htmlFor="productdimages" className="cursor-pointer">
                <div className="h-24 w-24 rounded bg-gray-200 flex justify-center items-center">
                  <IoAddCircleOutline color="orange" size={30} />
                </div>
              </label>
            )}
            {productImages?.map((img, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="inline-block relative" key={idx}>
                <img
                  src={URL.createObjectURL(img)}
                  loading="lazy"
                  className="h-24 w-24 rounded object-cover m-2"
                  alt={img.name}
                />
                <button
                  type="button"
                  className="absolute cursor-pointer top-0 right-0 rounded-full bg-red-600 text-white h-6 w-6 flex items-center justify-center"
                  onClick={() => {
                    removeImage(idx);
                  }}>
                  <RxCross2 />
                </button>
              </div>
            ))}
          </div>
          {errors?.productImages && (
            <span className="text-red-500 text-sm">{errors.productImages.message?.toString()}</span>
          )}
        </div>

        <div>
          <input
            type="submit"
            value="Add Product"
            className="appearance-none cursor-pointer text-center block w-full h-9 border border-orange-500 text-orange-500 rounded transition-all hover:text-white hover:bg-orange-500"
          />
        </div>
      </form>
    </div>
  );
}
