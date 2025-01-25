import {Accordion, AccordionItem} from "@heroui/react";

const AccordionMenu = () => {
    const backgroundTitle = "Background";
    const backgroundContent = "This is the background content";
    const experienceTitle = "Experience";
    const experienceContent = "This is the experience content";
    const hobbiesTitle = "Hobbies";
    const hobbiesContent = "This is the hobbies content";

  return (
    <Accordion>
      <AccordionItem key="1" aria-label={backgroundTitle} title={backgroundTitle}>
        {backgroundContent}
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