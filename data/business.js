import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";

const business = {
  name: "TurboTut",
  plans: [
    {
      name: "premium",
      stripeLookUpKey: "premium-plan",
      price: 14.99,
      duration: "monthly",
      benefits: [
        {
          IconTag: FlashOnRoundedIcon,
          description: "Understand all your subjects quickly and effectively",
        },
        {
          IconTag: SchoolRoundedIcon,
          description: "In depth coverage of each subject",
        },
        {
          IconTag: KeyRoundedIcon,
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
