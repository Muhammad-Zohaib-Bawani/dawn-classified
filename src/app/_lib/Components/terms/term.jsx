import React from "react";
import './term.css'
export default function Term({ setIsTermModalOpen }) {
  const handleConfirm = () => {
    setIsTermModalOpen(false);
  };
  return (
    <>
      <div className="head">
        <h5>Terms and Conditions</h5>
      </div>
      <div className="container all">
        <div className="row">
          <div className="col-sm-12 main-div">
            <h5 className="heading">Advertisement Acceptance</h5>
            <p className="smaller">
              All advertisements are accepted provisionally and publication
              thereof is subject to subsequent scrutiny and approval by PHPL.
              The management reserves the right to accept or reject any
              advertisement.
            </p>
            <h5 className="heading">Language &amp; Grammar</h5>
            <p className="smaller">
              The text of the advertisement may be changed to conform to the
              standard grammatical form of the English language.
            </p>
            <h5 className="heading">Advertisement Acceptance</h5>
            <p className="smaller">
              All advertisements are accepted provisionally and publication
              thereof is subject to subsequent scrutiny and approval by PHPL.
              The management reserves the right to accept or reject any
              advertisement.
            </p>
            <h5 className="heading">Non-Publication / Mispublication </h5>
            <p className="smaller">
              While every care will be taken to publish the advertisement as
              specified the management shall not be held responsible for any
              inadvertent lapse in this regard resulting in either non
              publication or mispublication of the ad due to technical reasons
              or unforeseen circumstances and no claim for consequential damages
              will be entertained on this account.
            </p>
            <h5 className="heading">Free Make Good (FMG) Claims</h5>
            <p className="smaller">
              Any claim for incorrect publication of the advertisement should be
              filed within 3 working days of the publication of the
              advertisement in writing along with a copy of this cash memo. In
              case the claim is accepted by the management, such an
              advertisement would be made good only through a repeat publication
              at the convenience of the management.
            </p>
            <h5 className="heading">Refund</h5>
            <p className="smaller">
              In case of refund due to cancellation of the advertisement a
              service charge @ 10% of the gross amount of the advertisement be
              made which is also adjustable in some other advertisement of the
              same advertiser. On instances where words intended in BOLD/CAPS
              are not published as specified, PHPL will have the option to grant
              a refund of the proportion of the extra charges only.{" "}
            </p>
            <h5 className="heading">Cancellation / Amendment </h5>
            <p className="smaller">
              For alteration and/or cancellation of the advertisement at least
              24 hours notice within working hours is required in writing. In
              case of an advertisement for Monday’s issue, this information
              should reach the classified section of dawn by 12 noon on
              Saturday. (Not applicable to ads booked on Fridays for Sundays)
            </p>
            <h5 className="heading">Box Replies</h5>
            <p className="smaller">
              Box replies can be collected within 21 days from the office of
              daily DAWN during office hours, only against production of
              original copy of the relevant cash memo.
            </p>

            
          </div>
<hr />
<div className="row">
          <div className="col-sm-10">
            <p className="lastPara">
              * I HAVE READ AND UNDERSTAND, AND I ACCEPT AND AGREE TO ALL OF
              THESE TERMS AND CONDITIONS. I ENTER INTO THIS AGREEMENT
              VOLUNTARILY, WITH FULL KNOWLEDGE OF ITS EFFECT.
            </p>
          </div>
          <div className="col-sm-2">
            <button
              onClick={handleConfirm}
              htmlType="submit"
              className="tbtn"
            >
              Confirm
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
