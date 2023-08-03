import loadable from "@loadable/component";
const ForgotPassword = loadable(
  () => import("../../components/Auth/forgotpassword/ForgotPassword")
);

export default function ForgotPasswordPage() {
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <ForgotPassword />
    </section>
  );
}
