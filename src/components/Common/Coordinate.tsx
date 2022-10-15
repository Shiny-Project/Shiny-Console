import React, { useMemo } from "react";

interface Props {
    coordinate: string;
}

const Coordinate: React.FC<Props> = (props: Props) => {
    const { coordinate } = props;
    const parsedCoordinate = useMemo(() => {
        try {
            const [_, operator1, coordinate1, operator2, coordinate2] =
                coordinate.match(/^([+-])([0-9.]+)([+-])([0-9.]+)\/*$/);
            return [operator1, coordinate1, operator2, coordinate2];
        } catch {
            return [];
        }
    }, [coordinate]);
    if (!parsedCoordinate.length) {
        return null;
    }
    return (
        <span>
            {parsedCoordinate[0] === "+" ? "北纬" : "南纬"}
            {parsedCoordinate[1]}°{" "}
            {parsedCoordinate[2] === "+" ? "东经" : "西经"}
            {parsedCoordinate[3]}°
        </span>
    );
};

export default Coordinate;
