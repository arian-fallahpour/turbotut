import LightningIcon from "@/components/Elements/Icons/LightningIcon";
import KeyIcon from "@/components/Elements/Icons/KeyIcon";
import SchoolIcon from "@/components/Elements/Icons/SchoolIcon";

const business = {
  name: "TurboTut",
  description: "Learn high school subjects at incredible speeds!",
  plans: [
    {
      name: "premium",
      stripeLookUpKey: "premium-plan",
      price: 14.99,
      duration: "monthly",
      benefits: [
        {
          IconTag: LightningIcon,
          description: "Understand all your subjects quickly and effectively",
        },
        {
          IconTag: SchoolIcon,
          description: "In depth coverage of each subject",
        },
        {
          IconTag: KeyIcon,
          description:
            "Access to secret study tricks and critical thinking questions",
        },
      ],
    },
  ],
  faq: [
    {
      title: "Are there refunds once I buy my premium subscription?",
      description:
        "We do not offer refunds for your current subscription duration, however, you may choose to cancel your subscription to prevent any charges for future billing cycles. This is to prevent users from buying the course, copying the information down, then refunding.",
    },
    {
      title: "How long are the courses on average?",
      description:
        "The courses are around 1-2 hours of length on average. They cover only the most necessary materials and do not waste any time.",
    },
  ],
};

export default business;
