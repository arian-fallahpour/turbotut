import React from "react";
import classes from "./SolutionSection.module.scss";

import imageDivider from "@/public/images/app/divider.svg";

import Section from "@/components/Elements/Section/Section";
import Light from "@/components/Elements/Light/Light";
import Image from "next/image";
import KeyIcon from "@/components/Elements/Icons/KeyIcon";
import LightningIcon from "@/components/Elements/Icons/LightningIcon";
import SearchIcon from "@/components/Elements/Icons/SearchIcon";
import Button from "@/components/Elements/Button/Button";
import { join } from "@/utils/helper";

const SolutionSection = () => {
  return (
    <Section className={classes.SolutionSection} limit={null}>
      <div className={join(classes.Divider, classes["Divider--top"])}>
        <Image alt="top divider" src={imageDivider} />
      </div>
      <div className={join(classes.Divider, classes["Divider--bottom"])}>
        <Image alt="bottom divider" src={imageDivider} />
      </div>
      <div className={classes.Container}>
        <div className={classes.Content}>
          <span className={classes.ContentShadow} />

          <div className={classes.ContentOuter}>
            <span className={classes.ContentGradient1} />
            <span className={classes.ContentGradient2} />

            <div className={classes.ContentMiddle}>
              <div className={classes.ContentInner}>
                <Light color="var(--c-green)" position="up" />
                <Light color="var(--c-green)" position="down" />

                <h2 className="header header-section text-center color-green">Our Solution</h2>
                <p className="paragraph">
                  We provide a number of ways that will guarantee your success in school, and as long as you take
                  advantage of them, you will reap its benefits
                </p>
                <ul className={classes.ContentList}>
                  <li className={classes.ContentListItem}>
                    <LightningIcon />
                    <p className="paragraph">Animations to help you understand concepts faster</p>
                  </li>
                  <li className={classes.ContentListItem}>
                    <KeyIcon />
                    <p className="paragraph">Secret tricks used by top students</p>
                  </li>
                  <li className={classes.ContentListItem}>
                    <SearchIcon />
                    <p className="paragraph">Critical thinking questions to push you further</p>
                  </li>
                </ul>
                <Button styleName="shiny" variantName="green" href="/courses" isLink>
                  View courses
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.Figure}>
          <div className={classes.FigureImage}>
            <Image
              src="/images/app/image-1.png"
              alt="test"
              sizes="(max-width: 700px) 75vw, (max-width: 1000px) 50vw, (max-width: 1440px) 35vw, 30vw"
              fill
            />
          </div>
        </div>
      </div>
    </Section>
  );

  // return (
  //   <Section className={classes.SolutionSection}>
  //     <div className={classes.SolutionSectionContent}>
  //       <div className={classes.Content}>
  //         <h2 className="header header-section color-green">Our solution</h2>
  //         <p className="paragraph">
  //           We provide a number of ways that will guarantee your success in
  //           school, and as long as you take advantage of them, you will reap its
  //           benefits
  //         </p>

  //         <ul className={classes.ContentList}>
  //           <li className={classes.ContentListItem}>
  //             <div className={classes.Reason}>
  //               <div className={classes.ReasonContainer}>
  //                 <div className={classes.ReasonIcon}>
  //                   <KeyIcon />
  //                 </div>
  //                 <div className={classes.ReasonContent}>
  //                   <h3 className="header header-card">Captivating lectures</h3>
  //                   <p className="paragraph">
  //                     Our lectures utilize{" "}
  //                     <span className="color-green">animations</span> to
  //                     visualize concepts in order for you to understand them
  //                     better and faster
  //                   </p>
  //                 </div>
  //               </div>
  //               <span className={classes.ReasonGlow} />
  //             </div>
  //           </li>
  //           <li className={classes.ContentListItem}>
  //             <div className={classes.Reason}>
  //               <div className={classes.ReasonContainer}>
  //                 <div className={classes.ReasonIcon}>
  //                   <LightningIcon />
  //                 </div>
  //                 <div className={classes.ReasonContent}>
  //                   <h3 className="header header-card">Special benefits</h3>
  //                   <ul className="ul">
  //                     <li className="li">
  //                       <span className="color-green">Secret tricks</span> used
  //                       by top students
  //                     </li>
  //                     <li className="li">
  //                       <span className="color-green">Critical thinking</span>{" "}
  //                       questions to push you further
  //                     </li>
  //                   </ul>
  //                 </div>
  //               </div>
  //               <span className={classes.ReasonGlow} />
  //             </div>
  //           </li>
  //         </ul>

  //         <Button
  //           className={classes.ContentButton}
  //           variantName="green"
  //           href="/courses/calculus"
  //           isLink
  //         >
  //           View questions
  //         </Button>
  //       </div>
  //     </div>
  //     <div className={classes.SolutionSectionImage}>
  //       <div className={classes.Image}>
  //         <Image
  //           alt="Student studying hard"
  //           src="/images/app/studying-1.png"
  //           fill
  //         />
  //       </div>
  //     </div>
  //   </Section>
  // );
};

export default SolutionSection;
