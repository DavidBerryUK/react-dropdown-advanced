/*****************************************************************/

import OptionApiModel from "../../../../models/OptionApiModel";

/* Standard List Controller
/*****************************************************************/
interface IUIStandardListProgramming {
  options: Array<OptionApiModel>;
}
const UIStandardList: React.FC<IUIStandardListProgramming> = ({ options }) => {
  return (
    <div className="standard-list-demo">
      <div className="list-container">
        {options.map((item) => (
          <div key={item.code} className="list-item">
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UIStandardList;
