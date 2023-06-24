import styles from "../item.module.css"

function Item(props){

  const handleClick = () => {
    props.onClick();
  };

    return (

        <div className={styles.card}>
        <div className= {styles.cardImg}></div>
        <div className={styles.cardInfo}>
          <p className={styles.textTitle}>{props.title}</p>
          <p className={styles.textBody}>Product description and details</p>
        </div>
        <div className={styles.cardFooter}>
        <span className={styles.textTitle}>₨ {props.price}</span>
        <div className={styles.cardButton} >
          {props.showButton && <button onClick={handleClick} >Claim</button>}
        </div>
      </div>
      </div>

    );
}

export default Item;
