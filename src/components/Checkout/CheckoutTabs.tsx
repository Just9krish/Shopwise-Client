type IProps = {
  activeStep: number;
};

export default function CheckoutTabs({ activeStep }: IProps) {
  const steps = ['1. Shipping', '2. Payment', '3. Success'];

  const progressBarWidth = () => {
    switch (activeStep) {
      case 0:
        return 'after:w-0';
      case 1:
        return 'after:w-1/2';
      default:
        return 'after:w-full';
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`rounded-full px-4 py-2 font-bold text-sm transition-all duration-500 font-Roboto ${
              index <= activeStep ? 'text-white bg-[#5cb85c]' : 'text-[#a9b0b4] bg-[#EAF0F4]'
            }`}>
            {step}
          </span>
        ))}
      </div>
      <div
        className={`absolute left-0 h-2 top-1/2 -translate-y-1/2 bg-[#EAF0F4] w-full rounded-full transition-all -z-10 ease-in-out duration-500 after:w-0 after:z-0 after:h-full after:absolute after:bg-[#5cb85c] ${progressBarWidth()}`}
      />
    </div>
  );
}
