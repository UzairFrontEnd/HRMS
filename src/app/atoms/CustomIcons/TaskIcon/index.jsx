import React from "react";
import Icon from '@ant-design/icons';

const TaskSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M191.26,185.78a9.672,9.672,0,0,1,.44,2.91,9.783,9.783,0,1,1-6.85-9.33l-.17.16a3.187,3.187,0,0,0-.89,1.78l-.08.56a6.61,6.61,0,0,0-1.79-.24,7.075,7.075,0,1,0,7.07,7.07,6.61,6.61,0,0,0-.24-1.79l.56-.08a3.152,3.152,0,0,0,1.79-.89Zm.12-5.33-1.42.2.21-1.42a.662.662,0,0,0-.66-.75.629.629,0,0,0-.45.19l-1.82,1.82-.79.79a.648.648,0,0,0-.18.37l-.19,1.33-.11.74-3.22,3.22a2,2,0,0,0-.84-.2,1.96,1.96,0,1,0,1.96,1.96,2,2,0,0,0-.2-.84l3.22-3.22.74-.1,1.33-.19a.662.662,0,0,0,.37-.19l.79-.79,1.82-1.82a.629.629,0,0,0,.19-.45A.66.66,0,0,0,191.38,180.45Z" transform="translate(-172.13 -178.48)" />
    </svg>
  );

  const TaskIcon = props => <Icon component={TaskSvg} {...props} />;

  export default TaskIcon;