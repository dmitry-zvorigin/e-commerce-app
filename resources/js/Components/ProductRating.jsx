import { Rating } from "@mui/material";

export default function ProductRating({ value, size="small", }) {

    const valueFloat = parseFloat(value);
    return (
        <Rating
            name="customized-empty"
            size={size}
            value={valueFloat}
            precision={0.1}
            readOnly
        />
    );

}