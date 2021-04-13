import React from "react";
import { ShinyEEWEvent, ShinyEvent, ShinyEventDetail } from "types/dashboard";
import EEW from "./Extend/EEW";

interface Props {
    event: ShinyEventDetail;
}

const isEEWEvent = (
    event: ShinyEvent | ShinyEEWEvent
): event is ShinyEEWEvent => {
    return "code" in event.data;
};

function EventExtendContent(props: Props) {
    const { event } = props;
    if (isEEWEvent(event.event)) {
        return <EEW event={event.event} />;
    }
}

export default EventExtendContent;
