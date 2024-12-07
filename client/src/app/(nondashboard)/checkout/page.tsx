import { Loading } from "@/components/Loading";
import { WizardStepper } from "@/components/WizardStepper";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useUser } from "@clerk/nextjs";

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const {checkoutStep} = useCheckoutNavigation()
  if (!isLoaded) return <Loading />;

  function renderStep() {
    switch (checkoutStep) {
      case 1:
        return "checkout details page";
      case 2:
        return "payment page";
      case 3:
        return "copmletion page";
      default:
        return "checkout details page";
    }
  }

  const step = renderStep();

  return (
    <div className="checkout">
        <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{step}</div>
    </div>
  );
};

export default CheckoutWizard;
