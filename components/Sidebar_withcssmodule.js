import { Avatar, IconButton } from "@material-ui/core";
import Chat from "@material-ui/icons/Chat";
import MoreVert from "@material-ui/icons/MoreVert";

import styles from "../styles/Sidebar.module.css";

function Sidebar() {
  return (
    <div>
      <div className={styles.header}>
        <Avatar />
        <div>
          <IconButton>
            <Chat style={{ color: "#AEBAC1" }} />
          </IconButton>
          <IconButton>
            <MoreVert style={{ color: "#AEBAC1" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
