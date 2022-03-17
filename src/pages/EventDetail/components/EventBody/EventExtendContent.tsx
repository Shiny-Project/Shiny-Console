import {
    ShinyEEWEvent,
    ShinyEvent,
    ShinyEventDetail,
    ShinyTsunamiObservationEvent,
} from "types/dashboard";
import EEW from "./Extend/EEW";
import TsunamiObservation from "./Extend/TsunamiObservation";

interface Props {
    event: ShinyEventDetail;
}

const isEEWEvent = (
    event: ShinyEvent | ShinyEEWEvent
): event is ShinyEEWEvent => {
    return event.publisher === "eew";
};

const isTsunamiObservationEvent = (
    event: ShinyEvent | ShinyEEWEvent
): event is ShinyTsunamiObservationEvent => {
    return event.publisher === "tsunami_observation";
};

function EventExtendContent(props: Props) {
    const { event } = props;
    if (isEEWEvent(event.event)) {
        return <EEW event={event.event} />;
    }
    if (isTsunamiObservationEvent(event.event)) {
        return <TsunamiObservation event={event.event} />;
    }
    return null;
}

export default EventExtendContent;
