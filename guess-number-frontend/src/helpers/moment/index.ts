import moment from "moment";

export const getCurrentTime = () => {
  return moment().toString();
};

export const makeTimeFormat = (
  time: Date | string | moment.Moment,
  format = "HH:mm"
) => {
  return moment(time)
    .format(format)
    .toString();
};
