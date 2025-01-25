import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure, 
} from "@heroui/react";

import { HiMenu } from "react-icons/hi";

import AccordionMenu from "./accordionMenu.jsx";
import ProfileInfo from "./profileInfo.jsx";

const TopMenu = () => {
    // Top menu listeners
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div className="top-menu">
            <Button isIconOnly onPress={onOpen} variant="light" radius="none" size="lg" title="Menu">
                <HiMenu size="1.5em" />
            </Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                {(onClose) => (
                    <>
                    <DrawerHeader>
                        <ProfileInfo />
                    </DrawerHeader>
                    <DrawerBody>
                        <AccordionMenu />
                    </DrawerBody>
                    <DrawerFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button variant="light" onPress={onClose}>
                        Download PDF
                        </Button>
                    </DrawerFooter>
                    </>
                )}
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default TopMenu;