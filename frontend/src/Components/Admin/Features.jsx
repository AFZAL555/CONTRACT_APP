import React from 'react'
import '../User/plan.css'

const Features = ({title,money,subtitle}) => {
  return (
    <div>
        <div className="featuredItem">
                <span className="featuredTitle">{title}</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney"> {money}</span>
                </div>
                <span className="featuredSub">{subtitle}</span>
            </div>
    </div>
  )
}

export default Features