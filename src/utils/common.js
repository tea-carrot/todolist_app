import moment from 'moment';
import 'moment/locale/ko';

export function getDateTime() {
  //   const today = new Date();
  const now = moment().format('MM/DD HH:mm');
  return now;
}
