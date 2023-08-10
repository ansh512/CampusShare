import '../css/list.css'

function List(props){

    return(
        <details>
            <summary>
            {props.user} offered {props.amount} to buy.
            <label style={{marginLeft:"20px"}}>
                <button value={props._id} onClick={props.onAccept} class="tooltip">
                    Accept
                    <span class="tooltiptext">Warning! Press to accept the offer.</span>
                </button> 
            </label>
            </summary>
            <ul>
                {props.remark}
            </ul>
         </details>
    );
}

export default List;