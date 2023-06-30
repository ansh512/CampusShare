import styles from "../css/item.module.css"
//import ImageSlider from "./imgSlider";

function Item(props){

  const handleClick = () => {
    props.onClick();
  };

    return (
<>
<div className={styles.container}>
      <div className={styles.images}>
        <img className={styles.img} alt="product img" src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" />
      </div>
      <div className={styles.product}>
        <h1 className={styles.h1}>{props.title}</h1>
        <h2 className={styles.h2}>₹ {props.price}</h2>
        <p className={styles.desc}>
         {props.description}
        </p>
        <div className={styles.buttons}>
          <button className={`${styles.add} ${styles.button}`} onClick={handleClick}>{props.buttonText}</button>
          <button className={`${styles.like} ${styles.button}`}>
            <span>♥</span>
          </button>
        </div>
      </div>
    </div>
</>

    );
}

export default Item;
