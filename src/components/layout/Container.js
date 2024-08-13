import styles from './Container.module.css'; // Import the CSS module

function Container(props) {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    );
}

export default Container;
