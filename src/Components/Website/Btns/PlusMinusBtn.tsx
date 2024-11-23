import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);

    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  useEffect(() => {
    if (props.count) {
      setBtn(props.count);
    }
  }, [props.count]);

  return (
    <div className="flex items-center gap-2">
      <span
        className=""
        onClick={() => {
          if (btn > 0) {
            setBtn((prev) => prev - 1);
          } else {
            setBtn(0);
          }
        }}
      >
        <button
          type="button"
          className="bg-red-600 text-white px-2 py-1 rounded-md"
          data-type="minus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>
      <div className="">
        <input
          type="number"
          name="quant[2]"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          min={1}
          max={100}
          value={btn}
          onChange={(e) => {
            if (e.target.value > 0) {
              setBtn(e.target.value);
            } else {
              setBtn(0);
            }
          }}
        />
      </div>
      <span
        className="input-group-btn"
        onClick={() => setBtn((prev) => ++prev)}
      >
        <button
          type="button"
          className="bg-primary-900 text-white px-2 py-1 rounded-md"
          data-type="plus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}
