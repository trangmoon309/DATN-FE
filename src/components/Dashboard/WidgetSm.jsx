import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm({datas}) {
  const virtualDirectory = 'http://localhost:3333/datn/profile-images/';

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">

        {datas.map((item) => {
          return(
            <li className="widgetSmListItem">
            <img
              src={item.extraInfors.avatarId != null && item.extraInfors.avatarId != '' && item.extraInfors.avatarId != 'string' ? virtualDirectory + item.extraInfors.avatarId + ".jpg" : "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{item.name + " " + item.surname}</span>
              <span className="widgetSmUserTitle">{item.userName}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        )})}
      </ul>
    </div>
  );
}
