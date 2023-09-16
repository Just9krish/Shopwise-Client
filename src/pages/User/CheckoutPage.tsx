import loadable from '@loadable/component';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectCart } from '../../redux/features/Cart/cartSlice';

const Checkout = loadable(() => import('../../components/Checkout/Checkout'));
const CheckoutTabs = loadable(() => import('../../components/Checkout/CheckoutTabs'));

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useAppSelector(selectCart);
  function toggleActiveStep(index: number) {
    setActiveStep(index);
  }

  return cart.length === 0 ? (
    <Navigate to="/" />
  ) : (
    <section className="my-10">
      <div className="max-w-6xl py-10 mx-auto">
        <div className="w-full max-w-xl">
          <CheckoutTabs activeStep={activeStep} toggleActiveStep={toggleActiveStep} />
        </div>
        <div className="mt-8" />
        <Checkout activeStep={activeStep} toggleActiveStep={toggleActiveStep} />
      </div>
    </section>
  );
}
