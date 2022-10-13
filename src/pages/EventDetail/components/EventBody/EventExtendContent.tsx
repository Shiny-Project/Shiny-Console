import {
    ShinyEEWEvent,
    ShinyEvent,
    ShinyEventDetail,
    ShinyTsunamiEstimationEvent,
    ShinyTsunamiObservationEvent,
    ShinyTyphoonInfoEvent,
} from "types/dashboard";
import EEW from "./Extend/EEW";
import TsunamiEstimation from "./Extend/TsunamiEstimation";
import TsunamiObservation from "./Extend/TsunamiObservation";
import TyphoonInfo from "./Extend/Typhoon";

interface Props {
    event: ShinyEventDetail;
}

const isEEWEvent = (event: ShinyEvent): event is ShinyEEWEvent => {
    return event.publisher === "eew";
};

const isTsunamiObservationEvent = (
    event: ShinyEvent
): event is ShinyTsunamiObservationEvent => {
    return event.publisher === "tsunami_observation";
};

const isTsunamiEstimationEvent = (
    event: ShinyEvent | ShinyEEWEvent
): event is ShinyTsunamiEstimationEvent => {
    return event.publisher === "tsunami_estimation";
};

const isTyphoonInfoEvent = (
    event: ShinyEvent | ShinyTyphoonInfoEvent
): event is ShinyTyphoonInfoEvent => {
    return event.publisher === "JMATyphoon";
};

function EventExtendContent(props: Props) {
    const { event } = props;
    if (isEEWEvent(event.event)) {
        return <EEW event={event.event} />;
    }
    if (isTsunamiObservationEvent(event.event)) {
        return <TsunamiObservation event={event.event} />;
    }
    if (isTsunamiEstimationEvent(event.event)) {
        return <TsunamiEstimation event={event.event} />;
    }
    if (isTyphoonInfoEvent(event.event)) {
        return <TyphoonInfo event={event.event} />;
    }
    return null;
}

export default EventExtendContent;
