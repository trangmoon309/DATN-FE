import "./widgetLg.css";

export default function WidgetLg({datas}) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        
        {datas.map((item) => {
          return(
            <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <span className="widgetLgName">{item.user.name + " " + item.user.surname}</span>
            </td>
            <td className="widgetLgDate">{item.creationTime}</td>
            <td className="widgetLgAmount">${item.totalCost}</td>
            <td className="widgetLgStatus">
              <Button type={item.rentalStatus == 0 ? "Waiting" : (item.rentalStatus == 1 ? "Using" : (item.rentalStatus == 2 ? "Returned" : "Cancel"))} />
            </td>
          </tr>
        )})}
      </table>
    </div>
  );
}
