import {Card, CardHeader, CardBody, CardFooter, Divider} from "@heroui/react";

const CardItem = ({ header, subHeader, description, grade, location, period }) => (
    <Card className="max-w-[350px] shadow-[0_4px_12px_0_rgba(255,255,255,0.5)]">
        <CardHeader>
            <div className="flex flex-col">
                <p className="text-base font-bold">{header}</p>
                <p className="text-sm text-gray-500">{subHeader}</p>
            </div>
        </CardHeader>
        <Divider />
        <CardBody>
            <p className="text-sm">{description}</p>
            <p className="text-sm">{grade}</p>
            <p className="text-sm text-gray-500">{period}</p>
        </CardBody>
        <Divider />
        <CardFooter>
            <p className="text-xs text-gray-500">{location}</p>
        </CardFooter>
    </Card>
);

export default CardItem;