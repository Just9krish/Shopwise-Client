import loadable from '@loadable/component';

const ResetPassword = loadable(() => import('../../components/Auth/resetpassword/ResetPassword'));

export default function ResetPasswordPage() {
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ResetPassword />
    </section>
  );
}
