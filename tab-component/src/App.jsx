import { useCallback, useState } from "react";
import TabContents from "./components/TabContents.jsx";
const TABS = [
  { id: 1, label: "Home", content: "Welcome to the Home tab" },
  { id: 2, label: "Profile", content: "This is the Profile tab" },
  { id: 3, label: "Settings", content: "Manage your Settings here" },
];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  let [tabList, setTabList] = useState(TABS);
  let tab = tabList[activeTab]?.content || "";

  let removeHandler = (deleteIndex) => {
    // active tab will remove
    let newPointer;

    if (deleteIndex === activeTab) {
      newPointer = Math.min(tabList.length - 2, activeTab);
      setTabList((prev) => {
        let temp = [...prev]
          .slice(0, deleteIndex)
          .concat(prev.slice(deleteIndex + 1));
        return temp;
      });
    } else if (deleteIndex > activeTab) {
      newPointer = activeTab;
      setTabList((prev) =>
        prev.slice(0, deleteIndex).concat(prev.slice(deleteIndex + 1)),
      );
    } else if (deleteIndex < activeTab) {
      newPointer = activeTab - 1;
      setTabList((prev) => {
        let temp = [...prev];
        temp = temp.slice(0, deleteIndex).concat(temp.slice(deleteIndex + 1));

        return temp;
      });
    }
    setActiveTab(newPointer);
  };

  return (
    <>
      <section id="spacer">
        {activeTab >= 0 && (
          <div>
            {tabList.map(({ id, label }, index) => {
              return (
                <span
                  style={{ margin: "0rem .2rem", border: "1px solid black" }}
                  key={id}
                >
                  <button
                    value={index}
                    onClick={(e) => setActiveTab(index)}
                    className={`btn ${activeTab === index ? "active-btn" : ""}`}
                    key={id}
                  >
                    {label}
                  </button>
                  <button
                    className="btn remove"
                    onClick={() => removeHandler(index)}
                  >
                    remove
                  </button>
                </span>
              );
            })}
          </div>
        )}
        {tabList.length === 0 && <p>No tabs configured</p>}
        {tab?.length > 0 && (
          <div className="content-container">
            <TabContents onRemove={removeHandler} content={tab} />
          </div>
        )}
      </section>
    </>
  );
}

export default App;
