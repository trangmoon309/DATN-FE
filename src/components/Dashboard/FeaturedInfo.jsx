import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo({data}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Avarage Quality Review</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4.3{data.qualityReview}</span>
          <span className="featuredMoneyRate">
           {data.qualityReviewDifference} <ArrowDownward  className={data.qualityReviewDifference > 0 ?"featuredIcon":"featuredIcon negative" }/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Average Income</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">653.29${data.averageIncome}</span>
          <span className="featuredMoneyRate">
          ${data.averageIncomeDifference} <ArrowDownward className={data.averageIncomeDifference > 0 ?"featuredIcon":"featuredIcon negative" }/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Transaction Cancel</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">12{data.transactionCancel}</span>
          <span className="featuredMoneyRate">
            {data.transactionCancelDifference} <ArrowUpward className={data.transactionCancelDifference > 0 ?"featuredIcon":"featuredIcon negative" }/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
