import "./cell.css";
import { getCellType } from "../../../features/utils/grid";


export default function Cell({ type }) {
    const className = getCellType(type);

    return <div className={className}></div>;
}

