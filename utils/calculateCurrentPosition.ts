import { beginTimestamp, timespanInSeconds, TRAVEL_DISTANCE } from "./constants";

export const calculateCurrentPosition = () => Math.floor((Date.now() - beginTimestamp) / 1000) * TRAVEL_DISTANCE / timespanInSeconds;
