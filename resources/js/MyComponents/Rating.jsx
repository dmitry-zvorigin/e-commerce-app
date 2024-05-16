import { Rating as CurstomRating } from "@mui/material";

export default function Rating ({ value = 0, size = 'medium', max = 5, readOnly = true, precision = 1}) {

    const valueFloat = parseFloat(value);
    const maxFloat = parseFloat(max);

    return (
        <CurstomRating value={valueFloat} max={maxFloat} readOnly={readOnly} size={size} style={{ color: '#FB923C' }} precision={precision}/>
    );
}