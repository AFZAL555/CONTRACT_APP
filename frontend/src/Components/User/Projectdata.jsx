import React from 'react'

const Projectdata = ( { Post } ) =>
{

    return (
        <div style={ { marginTop: "63px", marginLeft: "63px" } }>
            <p style={ { fontSize: "30px", fontFamily: "monospace" } }>{ Post.projectname }</p>
            <div style={ { display: "flex" } }>
                <p style={ { marginTop: "10px", marginLeft: "54px", fontSize: "18px", fontFamily: "monospace" } }>Descriptions :</p>
                <ol style={ { marginTop: "10px" } }>
                    <p style={ { fontSize: "14px", fontFamily: "monospace" } }>{ Post.description1 }</p>
                    <p style={ { fontSize: "14px", fontFamily: "monospace" } }>{ Post.description2 }</p>
                    <p style={ { fontSize: "14px", fontFamily: "monospace" } }>{ Post.description3 }</p>
                    <p style={ { fontSize: "14px", fontFamily: "monospace" } }>{ Post.description4 }</p>
                    <p style={ { fontSize: "14px", fontFamily: "monospace" } }>{ Post.description5 }</p>
                </ol>
            </div>
            <div style={ { display: "flex", marginTop: "10px" } }>
                <p style={ { fontSize: "30px", fontFamily: "monospace" } }>{ Post.bidAmount === 0 ? "BUDGET AMOUNT :" : "CURRENT BID :" }</p>
                <p style={ { fontSize: "30px", fontFamily: "monospace", color: "green" } }>{ Post.bidAmount === 0 ? Post.budget : Post.bidAmount }</p>
            </div>


        </div>
    )
}

export default Projectdata