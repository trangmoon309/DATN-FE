import FeaturedInfo from "./FeaturedInfo";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./home.css";
import WidgetLg from './WidgetLg';
import WidgetSm from './WidgetSm';
import LineChart from "./LineChart";
import { FooterContainer } from './../Footer/FooterContainer';

export default function Dashboard() {
  return (
    <div>
        <div style={{"z-index": "2em" }}>
            <NavigationBar></NavigationBar>
        </div>
        <div className="home">
            <FeaturedInfo />
            <div  className="linechart">
              <LineChart></LineChart>
            </div>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
        <FooterContainer></FooterContainer>
    </div>
  );
}
