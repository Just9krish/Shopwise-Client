export default function Success() {
  return (
    <div className="bg-white shadow flex justify-center items-center flex-col min-h-[54.5vh]">
      <iframe
        title="Order Placed Successfully"
        className="w-[400px] h-[400px] mt-8 mb-8"
        frameBorder="0"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        src="https://embed.lottiefiles.com/animation/100858"
      />
      <h4 className="mt-4 font-semibold text text-[#5d5d5d]">Your order placed successfully</h4>
    </div>
  );
}
