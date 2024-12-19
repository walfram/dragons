import "./Spinner.css";
import {useAppSelector} from "../store/store.ts";
import {isSpinnerVisible} from "../store/spinnerSlice.ts";

export default function Spinner() {
  const visible = useAppSelector(isSpinnerVisible);

  if (visible)
    return (
        <div className={"loading-state"}>
          <div className="lds-hourglass"></div>
        </div>
    );
}
