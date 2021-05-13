import { Card, Carousel } from "antd";
import "./index.css";

interface Props {
    images: string[];
}

function EventImages(props: Props) {
    const { images = [] } = props;
    return (
        <Card title="事件图片" className="event-image-card">
            <Carousel>
                {images.map((url) => (
                    <img
                        src={url}
                        className="event-image-item"
                        key={url}
                        alt="事件图片"
                    ></img>
                ))}
            </Carousel>
        </Card>
    );
}

export default EventImages;
