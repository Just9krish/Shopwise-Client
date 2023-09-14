import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import loadable from '@loadable/component';
import { API_URL } from './constant';
import { fetchUserDetailsAsync } from './redux/features/User/userSlice';
import { fetchShopAsync } from './redux/features/Shop/shopSlice';

import store from './redux/store';
import SellerProtectedRoute from './protected-routes/SellerProtectedRoute';
import ProtectedRoute from './protected-routes/Protectedroute';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/User/LoginPage';
import HomePage from './pages/HomePage';
import OrderDetailsPage from './pages/Seller/OrderDetailsPage';
import { fetchCartDetailsAsync } from './redux/features/Cart/cartSlice';
import { getWishlistAsync } from './redux/features/Wishlist/wishlistSlice';
import UserOrderDetailsPage from './pages/User/UserOrderDetailsPage';

const ActivationPage = loadable(() => import('./pages/User/ActivationPage'));
const ProductsPage = loadable(() => import('./pages/ProductsPage'));
const ProductPage = loadable(() => import('./pages/ProductPage'));
const SignupPage = loadable(() => import('./pages/User/SignupPage'));
const EventsPage = loadable(() => import('./pages/EventsPage'));
const FAQ = loadable(() => import('./pages/FAQPage'));
const ProfilePage = loadable(() => import('./pages/User/ProfilePage'));
const ShopCuponsPage = loadable(() => import('./pages/Seller/ShopCuponsPage'));
const CheckoutPage = loadable(() => import('./pages/User/CheckoutPage'));
const ShopHomePage = loadable(() => import('./pages/Seller/ShopHomePage'));

const CreateShop = loadable(() => import('./pages/Seller/SellerAuth/CreateShopPage'));
const SellerActivationPage = loadable(
  () => import('./pages/Seller/SellerAuth/SellerActivationPage')
);
const ShopLoginPage = loadable(() => import('./pages/Seller/SellerAuth/ShopLoginPage'));
const ShopDashboardPage = loadable(() => import('./pages/Seller/ShopDashboardPage'));
const SellerAddProductPage = loadable(() => import('./pages/Seller/SellerAddProductPage'));
const SellerProductsPage = loadable(() => import('./pages/Seller/SellerProductsPage'));
const SellerCreatEventPage = loadable(() => import('./pages/Seller/SellerCreatEventPag'));
const ShopAllEventsPage = loadable(() => import('./pages/Seller/ShopAllEventsPage'));
const SellerAllOrdersPage = loadable(() => import('./pages/Seller/SellerAllOrdersPage'));
const ForgotPasswordPage = loadable(() => import('./pages/User/ForgotPasswordPage'));
const ResetPasswordPage = loadable(() => import('./pages/User/ResetPasswordPage'));

function App() {
  const [stripeKey, setStripeKey] = useState<string | null>(null);

  async function getStripeSecretKey() {
    const { data } = await axios.get(API_URL.GET_STRIPE_SECRET_KEY);
    setStripeKey(data);
  }

  useEffect(() => {
    Promise.all([
      store.dispatch(fetchUserDetailsAsync()),
      store.dispatch(fetchShopAsync()),
      // store.dispatch(getAllEventsAsync()),
      store.dispatch(fetchCartDetailsAsync()),
      store.dispatch(getWishlistAsync()),
      getStripeSecretKey(),
    ]);
  }, []);

  return (
    <BrowserRouter>
      {stripeKey && stripeKey.length > 0 && (
        <Elements stripe={loadStripe(stripeKey)}>
          <Routes>
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CheckoutPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPasswordPage />} />
        <Route path="/user/verify/:verificationToken" element={<ActivationPage />} />
        <Route path="/seller/verify/:activationToken" element={<SellerActivationPage />} />
        <Route
          path="/products/:productId"
          element={
            <Layout>
              <ProductPage />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />

        <Route
          path="/events"
          element={
            <Layout>
              <EventsPage />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="order/:orderId" element={<UserOrderDetailsPage />} />

        {/* shop routes */}
        <Route path="/create-shop" element={<CreateShop />} />
        <Route path="/login-shop" element={<ShopLoginPage />} />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-add-product"
          element={
            <SellerProtectedRoute>
              <SellerAddProductPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-orders"
          element={
            <SellerProtectedRoute>
              <SellerAllOrdersPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-orders/:orderId"
          element={
            <SellerProtectedRoute>
              <OrderDetailsPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/shop-create-event"
          element={
            <SellerProtectedRoute>
              <SellerCreatEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-products"
          element={
            <SellerProtectedRoute>
              <SellerProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEventsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop-cupouns"
          element={
            <SellerProtectedRoute>
              <ShopCuponsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/shop/:shopId"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={3}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
