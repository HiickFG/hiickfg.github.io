import {Accordion, AccordionItem} from "@heroui/react";
import CardItem from "./cardItem";

const AccordionMenu = () => {
    const backgroundTitle = "Academic Background";
    const experienceTitle = "Experience";
    const experienceContent = "This is the experience content";
    const hobbiesTitle = "Hobbies";
    const hobbiesContent = "This is the hobbies content";

  return (
    <Accordion>
      <AccordionItem key="1" aria-label={backgroundTitle} title={backgroundTitle}>
        <Accordion>
          <AccordionItem 
            key="1" 
            aria-label="Bachelor of Science (BSc) - Mechanical Engineering" 
            title="Bachelor of Sciente (BCs)" 
            subtitle="Mechanical Engineering"
          >
            <div className="flex flex-col gap-10 pb-5">
              <CardItem 
                description="University Centre of FEI"
                grade="Grade: 7.0"
                header="Mechanical Engineering (BSc)"
                location="Sao Paulo, Brazil"
                period="2010-2016 (6 years, 1 year studying abroad )"
              />
              <div className="flex justify-center -mt-10 -mb-10">
                <div className="w-[2px] h-10 shadow-[0_4px_12px_0_rgba(255,255,255,0.5)]"></div>
              </div>
              <CardItem 
                header="Sandwich Program"
                subHeader="Science Without Borders"
                description="California State University, Long Beach (CSULB)"
                location="California, United States"
                period="2012-2013 (1 year)"
                grade="GPA: 3.633"
              />
              <div className="flex justify-center -mt-10 -mb-10">
                <div className="w-[2px] h-10 shadow-[0_4px_12px_0_rgba(255,255,255,0.5)]"></div>
              </div>
              <CardItem 
                header="Sandwich Program"
                subHeader="Science Without Borders"
                description="Stanford University (SU)"
                location="California, United States"
                period="2013 (summer courses)"
                grade="GPA: 3.0"
              />
            </div>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Master of Science (MSc) - Artificial Intelligence" title="Master of Science (MSc)" subtitle="Artificial Intelligence">
              <CardItem 
                header="Artificial Intelligence (MSc)"
                description="University of Leeds"
                location="Leeds, United Kingdom"
                period="2021-2023 (2 years)"
                grade="Final Grade: 80"
              />
          </AccordionItem>
        </Accordion>
      </AccordionItem>
      <AccordionItem key="2" aria-label={experienceTitle} title={experienceTitle}>
        {experienceContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label={hobbiesTitle} title={hobbiesTitle}>
        {hobbiesContent}
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionMenu;