import { formatDistanceToNow, isAfter, subHours, format } from 'date-fns';

export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const past24hrs = subHours(new Date(), 24);

    if(isAfter(date, past24hrs)){
        return formatDistanceToNow(date, {addSuffix: true})
    } else {
        return format(date, 'MM d');
    }
}

