import { ShinyEEWEvent, ShinyEvent, ShinyEventDetail } from "types/dashboard";
import EEW from "./Extend/EEW";

interface Props {
    event: ShinyEventDetail;
}

const isEEWEvent = (
    event: ShinyEvent | ShinyEEWEvent
): event is ShinyEEWEvent => {
    return event.publisher === "eew";
};

function EventExtendContent(props: Props) {
    const { event } = props;
    if (isEEWEvent(event.event)) {
        return <EEW event={event.event} />;
    }
    return null;
}

export default EventExtendContent;
