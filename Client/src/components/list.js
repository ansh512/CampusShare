import '../css/list.css'

function List(props){

    return(

        <details>
            <summary>
            {props.user} offered {props.amount} to buy.
            <label style={{marginLeft:"20px"}}>
                <input type="checkbox" value={props._id}/>     
            </label>
            </summary>
            <ul>
                {props.remark}
            </ul>
         </details>

    );
}

export default List;