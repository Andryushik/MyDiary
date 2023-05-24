import React, { useState } from "react";
import ModerationPosts from "./ModerationPosts";

const ModerationMiddle = () => {
  const [activeTab, setActiveTab] = useState("reported");

  return (
    <div className="middle-section">
      <div className="moderation-header">
        <div className="headers-switch">
          <h2
            onClick={() => setActiveTab("reported")}
            className={activeTab === "reported" ? "active-tab" : ""}
          >
            To review
          </h2>
          <h2
            onClick={() => setActiveTab("banned")}
            className={activeTab === "banned" ? "active-tab" : ""}
          >
            Banned
          </h2>
        </div>

        {activeTab === "reported" && (
          <p>
            These posts have been reported by users. They will still be visible
            to other users. <br />
            You can remove the report or ban the posts.
          </p>
        )}
        {activeTab === "banned" && (
          <p>
            These posts are banned by moderator. Users can&apos;t see them.
            <br /> Moderator can remove the ban from posts.
          </p>
        )}
      </div>
      <ModerationPosts status={activeTab} />
    </div>
  );
};

export default ModerationMiddle;
