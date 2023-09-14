import loadable from '@loadable/component';
import style from '../../styles/style';

const OrderDetails = loadable(() => import('../../components/shop/Dashboard/OrderDetails'));
const ShopHeader = loadable(() => import('../../components/shop/ShopLayout/ShopHeader'));

export default function OrderDetailsPage() {
  return (
    <>
      <ShopHeader />
      <section className={`${style.section}`}>
        <OrderDetails />
      </section>
    </>
  );
}
